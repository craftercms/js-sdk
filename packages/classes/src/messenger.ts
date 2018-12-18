import { Subject, Observable, Subscription, fromEvent, OperatorFunction } from 'rxjs';
import { filter, map, multicast, tap, refCount } from 'rxjs/operators';
import { notNullOrUndefined, ObserverOrNext } from '@craftercms/utils';
import { Message, MessageScope, MessageTopic } from '@craftercms/models';

export class Messenger {

  protected multiCaster$: Subject<Message>;
  protected messages$: Observable<Message>;

  protected targets: Array<any> = [];
  protected origins: Array<any> = [];

  constructor() {

    let
      multiCaster = new Subject<Message>(),
      messages = fromEvent(window, 'message')
        .pipe(
          tap((event: MessageEvent) =>
            !this.originAllowed(event.origin) &&
            console.log('Messenger: Message received from a disallowed origin.', event)
          ),
          filter((event: MessageEvent) =>
            this.originAllowed(event.origin) &&
            (typeof event.data === 'object') &&
            ('topic' in event.data) &&
            ('scope' in event.data)
          ),
          map((event: MessageEvent) => ({
            topic: event.data.topic,
            data: event.data.data ? event.data.data : null,
            scope: event.data.scope || MessageScope.Broadcast
          })),
          multicast(multiCaster),
          refCount()
        );

    this.messages$ = messages;
    this.multiCaster$ = multiCaster;

  }

  subscribe(observerOrNext: ObserverOrNext<Message>): Subscription;
  subscribe<T extends Message, R>(
    observerOrNext: ObserverOrNext<R>,
    ...operators: OperatorFunction<T, R>[]): Subscription;
  subscribe<T extends Message, R>(
    observerOrNext: ObserverOrNext<R>,
    ...operators: OperatorFunction<T, R>[]): Subscription {
    return this.messages$
      .pipe(...operators)
      .subscribe(observerOrNext);
  }

  subscribeTo<T, R>(topic: MessageTopic,
                    subscriber: (value: Message) => void,
                    scope?: MessageScope,
                    ...operations): Subscription {
    let ops = [];
    // operations = operations || [];
    if (!notNullOrUndefined(scope)) {
      ops.push(
        filter((message: Message) =>
          message.scope === scope && message.topic === topic));
    } else {
      ops.push(
        filter((message: Message) => message.topic === topic));
    }
    return this.messages$
      .pipe(...ops.concat(operations))
      .subscribe(subscriber);
  }

  addTarget(target: any): void {
    this.removeTarget(target);
    this.targets.push(target);
  }

  resetTargets(): void {
    this.targets = [];
  }

  removeTarget(target: Window): void {
    this.targets = this.targets.filter(function (item) {
      return item !== target;
    });
  }

  addOrigin(origin: string): void {
    this.removeOrigin(origin);
    this.origins.push(origin);
  }

  resetOrigins(): void {
    this.origins = [];
  }

  removeOrigin(origin: string): void {
    this.origins = this.origins.filter(function (item) {
      return item !== origin;
    });
  }

  publish(message: Message): void;

  publish(topic: MessageTopic,
          data: any,
          scope: MessageScope): void;

  publish(topicOrMessage: Message | MessageTopic,
          data: any = null,
          scope: MessageScope = MessageScope.Broadcast): void {
    let message: Message;

    if (topicOrMessage in MessageTopic) {
      message = {
        topic: <MessageTopic>topicOrMessage,
        data,
        message: data,
        scope
      };
    } else {
      message = <Message>topicOrMessage;
      message.message = message.data;
    }

    switch (scope) {
      case MessageScope.Local:
        this.multiCaster$.next(message);
        break;
      case MessageScope.External:
        this.sendMessage(message);
        break;
      case MessageScope.Broadcast:
        this.multiCaster$.next(message);
        this.sendMessage(message);
        break;
    }
  }

  sendMessage(message: Message, targetOrigin: string = '*'): void {    
    this.targets.forEach((target) => {
      // TODO need to determine where to get the origin
      if (!target.postMessage) {
        target = target.contentWindow;
      }
      if (!target || !target.postMessage) {
        // Garbage collection: get rid of any windows that no longer exist.
        this.removeTarget(target);
      } else {
        (<Window>target).postMessage(message, targetOrigin);
      }
    });
  }

  originAllowed(origin: string): boolean {
    for (let origins = this.origins, i = 0, l = origins.length; i < l; ++i) {
      if (origins[i] === origin) {
        return true;
      }
    }
    return false;
  }

}
