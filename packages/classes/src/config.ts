/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */

import { BehaviorSubject, Subscription, OperatorFunction } from 'rxjs';
import { ObserverOrNext, extendDeepExistingProps, isPlainObject, log } from '@craftercms/utils';
import { CrafterConfig } from '@craftercms/models';

const DEFAULTS: CrafterConfig = {
  site: '',
  baseUrl: '',
  searchId: null,
  endpoints: {
    GET_ITEM_URL: '/api/1/site/content_store/item.json',
    GET_DESCRIPTOR: '/api/1/site/content_store/descriptor.json',
    GET_CHILDREN: '/api/1/site/content_store/children.json',
    GET_TREE: '/api/1/site/content_store/tree.json',
    GET_NAV_TREE: '/api/1/site/navigation/tree.json',
    GET_BREADCRUMB: '/api/1/site/navigation/breadcrumb.json',
    TRANSFORM_URL: '/api/1/site/url/transform.json',
    SEARCH: 'crafter-search/api/2/search/search.json',
    ELASTICSEARCH: 'api/1/site/elasticsearch/search'
  },
  contentTypeRegistry: {}
};

class ConfigManager {
  private config: CrafterConfig;
  private config$: BehaviorSubject<CrafterConfig>;

  constructor() {
    this.config = { ...DEFAULTS };
    this.config$ = new BehaviorSubject({ ...DEFAULTS });
  }

  private publishConfig(config: CrafterConfig) {
    this.config = { ...config };
    this.config$.next({ ...config });
  }

  subscribe(observerOrNext: ObserverOrNext<CrafterConfig>): Subscription;
  subscribe<T extends CrafterConfig, R>(
    observerOrNext: ObserverOrNext<R>,
    ...operators: OperatorFunction<T, R>[]): Subscription;
  subscribe<T extends CrafterConfig, R>(
    observerOrNext: ObserverOrNext<R>,
    ...operators: OperatorFunction<T, R>[]): Subscription {
    return this.config$.pipe.apply(this.config$, operators).subscribe(observerOrNext);
  }

  entry(propPath: string): any;
  entry(propPath: string, nextValue?: any): void;
  entry(propPath: string, nextValue?: any): any | void {
    const config = this.config;
    if (!propPath) return { ...config };
    const getter = (nextValue == null);
    const path = propPath.split('.');
    const prop = (!getter) && (path.pop());
    const value = (() => {
      try {
        const l = path.length - 1;
        return path.length ? path.reduce(
          (cfg, property, i) =>
            getter && (l === i) && isPlainObject(cfg[property])
              ? { ...cfg[property] }
              : cfg[property],
          config) : config;
      } catch (e) {
        log(`Error retrieving crafter config prop '${propPath}': ${e.message || e}`, log.WARN);
        return null;
      }
    })();
    if (getter) {
      return value;
    } else if (
      (prop in value) ||
      (path[path.length - 1] === 'contentTypeRegistry')
    ) {
      this.publishConfig({ ...value, [prop]: nextValue });
    }
  }

  getConfig(): CrafterConfig {
    return { ...this.config };
  }

  mix(mixin: Partial<CrafterConfig> = {}): CrafterConfig {
    return {
      ...this.config,
      ...mixin
    };
  }

  configure(nextConfig: Partial<CrafterConfig>): void {
    const newConfig: CrafterConfig = extendDeepExistingProps({ ...this.config }, nextConfig);
    this.publishConfig(newConfig);
  }
}

const crafterConf = new ConfigManager();

export { crafterConf };
