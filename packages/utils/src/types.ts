import { PartialObserver } from 'rxjs/index';

export declare type ObserverOrNext<T> = (value: T) => void | PartialObserver<T>;

export declare type SearchEngines = 'solr' | 'elastic';
