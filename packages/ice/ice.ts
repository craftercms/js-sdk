import { log, ObserverOrNext } from '@craftercms/utils';
import { Messenger } from '@craftercms/classes';
import { MessageScope, Message, MessageTopic } from '@craftercms/models';

import { Observable, onErrorResumeNext, Subscription, OperatorFunction } from 'rxjs';

declare namespace window {
  const studioICERepaint: Function;
  const parent: any;
  const baseUrl: any;
}

/**
 * In Context Editing Utitly class
 */
export class InContextEditing {

  static communicator: Messenger;

  static configureMessenger(origin: string, target: {origin: string, contentWindow: any}) {
    const communicator: Messenger = new Messenger(),
          studioOrigin = window.baseUrl ? window.baseUrl : 'http://localhost:8080';

    communicator.addOrigin(studioOrigin);
    communicator.addTarget({
      origin: studioOrigin,
      contentWindow: window.parent
    });

    this.communicator = communicator;

    this.intializeEvents();
  
    let topic: MessageTopic = MessageTopic.GUEST_SITE_LOAD;
    let message = {
        location: 'http://localhost:3000',  //React app location
        url: '/'
    }
    let scope: MessageScope = MessageScope.Broadcast;

    communicator.publish(topic, message, scope);

    return communicator;
  }

  static intializeEvents(){
    this.communicator.subscribeTo(
      MessageTopic.HOST_ICE_START_REQUEST, 
      function onNext(e) {
        console.log("ICE_ON");
      },
      MessageScope.ALL
    );

    this.communicator.subscribeTo(
      MessageTopic.HOST_END_ICE_REQUEST, 
      function onNext(e) {
        console.log("ICE_OFF");
      },
      MessageScope.ALL
    );

    this.communicator.subscribeTo(
      MessageTopic.START_DRAG_AND_DROP,
      function onNext(e) {
        console.log("START_DRAG_AND_DROP");
      },
      MessageScope.ALL
    );

    this.communicator.subscribeTo(
      MessageTopic.REORDER_COMPLETE,
      function onNext(message) {
        console.log("REORDER_COMPLETE", message.data);
      },
      MessageScope.ALL
    )

    this.communicator.subscribeTo(
      MessageTopic.DND_COMPONENTS_PANEL_OFF,
      function onNext(e) {
        console.log("DND_COMPONENTS_PANEL_OFF");
      }
    )
  }

  /**
   * Adds the appropiate attributes to display the pencil for an ICE Group.
   * @param {string} id - ID of the HTML element
   * @param {string} group - Name of the ICE Group
   * @param {string} label - Label of the ICE Group
   */
  static addGroup(id, group, label) {
    let element = document.getElementById(id);
    if (element) {
      element.setAttribute('data-studio-ice', group);
      element.setAttribute('data-studio-ice-label', label || group);
    } else {
      log(`Could not add ICE group to element # ${id}`, log.ERROR);
    }
  }

  /**
   * Adds the appropiate attributes to display the pencil for a site component.
   * @param {string} id - ID of the HTML element
   * @param {string} path - Path of the site component
   * @param {string} label - Label of the site component
   */
  static addPath(id, path, label) {
    let element = document.getElementById(id);
    if (element) {
      element.setAttribute('data-studio-ice', '');
      element.setAttribute('data-studio-ice-path', path);
      element.setAttribute('data-studio-ice-label', label || path);
    } else {
      log(`Could not add ICE path to element # ${id}`, log.ERROR);
    }
  }

  /**
   * Updates the pencils according to all HTML attributes present in the page.
   * This method needs to be called after all changes to groups/components have been made.
   */
  static update() {
    if ('studioICERepaint' in window) {
      window.studioICERepaint();
    }
  }

  /**
   * Loads the scripts required for ICE group/components to work properly in the Crafter Studio Preview.
   * This method needs to be called once the page is loaded.
   * TODO: we should rather move all the guest.js logic into this lib
   */
  static addToolSupport() {
    let element = document.createElement('script');
    element.setAttribute('data-main', '/studio/overlayhook?cs.js');
    element.src = '/studio/static-assets/libs/requirejs/require.js';
    document.getElementsByTagName('body')[0].appendChild(element);
  }

  static subscribe(observerOrNext: ObserverOrNext<Message>): Subscription;
  static subscribe<T extends Message, R>(
    observerOrNext: ObserverOrNext<R>,
    ...operators: OperatorFunction<T, R>[]): Subscription{

    return this.communicator.subscribe(observerOrNext, ...operators);
  
  }

  static subscribeTo<T, R>(topic: MessageTopic,
                    subscriber: (value: Message) => void,
                    scope?: MessageScope,
                    ...operations): Subscription {
                      
    return this.communicator.subscribeTo(topic, subscriber, scope, ...operations);
  }

  static reorder(zoneId: string, order:Array<any>) {
    let message: Message = {
      topic: MessageTopic.DND_REORDER,
      data: {
        zoneId,
        order
      },
      scope: MessageScope.ALL
    }

    this.communicator.publish(message);
  }

  static zoneOn(itemId, iceId) {
    const message: Message = {
      topic: MessageTopic.ICE_ZONE_ON,
      data: {
        itemId
        // iceId
      },
      scope: MessageScope.ALL
    } 

    this.communicator.publish(message);
  }

}
