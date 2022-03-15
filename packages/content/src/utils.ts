/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
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

import { ContentInstance, DescriptorResponse } from '@craftercms/models';
import { urlTransform } from './UrlTransformationService';
import { getDescriptor, GetDescriptorConfig } from './ContentStoreService';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const systemPropMap = {
  guid: 'id',
  cmsId: 'id',
  objectId: 'id',
  localId: 'path',
  'file-name': 'fileName',
  'file__name': 'fileName',
  placeInNav: 'placeInNav',
  'internal-name': 'label',
  internal__name: 'label',
  'content-type': 'contentTypeId',
  content__type: 'contentTypeId',
  createdDate_dt: 'dateCreated',
  lastModifiedDate_dt: 'dateModified',
  disabled: 'disabled'
};

const ignoreProps = [
  'orderDefault_f',
  'merge-strategy',
  'display-template',
  'objectGroupId',
  'folder-name',
  'createdDate',
  'lastModifiedDate',
  'no-template-required'
];

const systemProps = Object.keys(systemPropMap).concat(
  Object.values(systemPropMap)
);

export interface ParseDescriptorOptions {
  /** Whether to parse the field values to their respective data type based on postfix (e.g. _i number, _b boolean, etc) */
  parseFieldValueTypes: boolean;
}

export function parseDescriptor(data: DescriptorResponse, options?: ParseDescriptorOptions): ContentInstance;
export function parseDescriptor(data: DescriptorResponse[], options?: ParseDescriptorOptions): ContentInstance[];
export function parseDescriptor(data: DescriptorResponse | DescriptorResponse[], options?: ParseDescriptorOptions): ContentInstance | ContentInstance[] {
  if (data == null) {
    return null;
  } else if (Array.isArray(data)) {
    return data.map((item) => parseDescriptor(item, options) as ContentInstance);
  } else if (data.children) {
    return parseDescriptor(extractChildren(data.children), options);
  } else if (data.descriptorDom === null && data.descriptorUrl) {
    // This path catches calls to getChildren (/api/1/site/content_store/children.json?url=&crafterSite=)
    // The getChildren call contains certain items that can't be parsed into content items.
    throw new Error(
      '[parseDescriptor] Invalid descriptor supplied. Did you call ' +
      'parseDescriptor with a `getChildren` API response? The `getChildren` API ' +
      'response may contain certain items that are not parsable into ContentInstances. ' +
      'Try a different API (getItem, getDescriptor or getTree) or filter out the metadata ' +
      'items which descriptorDom property has a `page` or `component` property with the content item.'
    );
  }
  let parsed: ContentInstance = {
    craftercms: {
      id: null,
      path: null,
      label: null,
      contentTypeId: null,
      dateCreated: null,
      dateModified: null,
      sourceMap: {}
    }
  };
  return parseProps(extractContent(data), parsed, options);
}

export function parseProps<Props = object, Target = object>(props: Props, parsed: Target = {} as Target, options: ParseDescriptorOptions = { parseFieldValueTypes: false }): Target {
  Object.entries(props).forEach(([prop, value]) => {
    if (ignoreProps.includes(prop)) {
      return; // continue, skip prop.
    }
    if (value?.['crafter-source-content-type-id']) {
      // @ts-ignore
      parsed.craftercms.sourceMap[prop] = value['crafter-source-content-type-id'];
      if (typeof value.text === 'string') {
        value = value.text;
      } else if (Object.keys(value).length === 2) {
        // Only has `crafter-source` & `crafter-source-content-type-id`. Empty value for the actual prop.
        value = null;
      }
    }
    if (systemProps.includes(prop)) {
      // @ts-ignore
      parsed.craftercms[systemPropMap[prop] ?? prop] = value;
      // Is there a risk prop name that matches what's considered a system prop?
      // In that case, here, parsed.craftercms might not be in the target object
      // and throw. We could do the below to de-risk but feels this needs assessment.
      // if (parsed.craftercms) {
      //   parsed.craftercms[systemPropMap[prop] ?? prop] = value;
      // } else {
      //   parsed[prop] = value;
      // }
    } else if (prop.endsWith('_o')) {
      parsed[prop] = value?.item ?? [];
      if (!Array.isArray(parsed[prop])) {
        parsed[prop] = [parsed[prop]];
      }
      parsed[prop] = parsed[prop].map((item) => {
        const { key, value, component, include } = item;
        if ((item.component) || (item.key && item.include)) {
          // Components
          const newComponent = {
            label: value,
            ...component,
            path: key?.startsWith('/')
              ? key
              : (
                include?.startsWith('/')
                  ? include
                  : component?.path ? component.path : null
              )
          };
          return parseDescriptor(newComponent, options);
        } else {
          // Repeat group items or key/value pairs
          return parseProps(item, void 0, options);
        }
      });
    } else {
      parsed[prop] = value != null
        ? options.parseFieldValueTypes ? parseFieldValue(prop, value) : value
        : null;
    }
  });
  return parsed;
}

export function parseFieldValue(propName: string, propValue: any): number | string | boolean {
  let postFix = propName.substr(propName.lastIndexOf('_'));
  switch (postFix) {
    /*
    _i  For integer number.
    _l  For long integer number.
    _f  For floating point number.
    _d  For long floating point number.
    _to For time
    _dt For date in ISO 8601
    */
    case '_b':
      return propValue.toLowerCase().trim() === 'true';
    case '_i':
    case '_l':
    case '_f':
    case '_d':
      return parseFloat(propValue);
    default:
      return propValue;
  }
}

export function fetchModelByPath(path: string): Observable<ContentInstance>;
export function fetchModelByPath(path: string, options?: GetDescriptorConfig & ParseDescriptorOptions): Observable<ContentInstance>;
export function fetchModelByPath(path: string, options?: GetDescriptorConfig & ParseDescriptorOptions): Observable<ContentInstance> {
  return getDescriptor(path, { flatten: options?.flatten ?? true }).pipe(
    map((descriptor) => parseDescriptor(descriptor, { parseFieldValueTypes: options?.parseFieldValueTypes ?? true }))
  );
}

export function fetchModelByUrl(webUrl: string): Observable<ContentInstance>;
export function fetchModelByUrl(webUrl: string, options?: GetDescriptorConfig & ParseDescriptorOptions): Observable<ContentInstance>;
export function fetchModelByUrl(webUrl: string, options?: GetDescriptorConfig & ParseDescriptorOptions): Observable<ContentInstance> {
  return urlTransform('renderUrlToStoreUrl', webUrl).pipe(
    switchMap((path) => getDescriptor(path as string, { flatten: options?.flatten ?? true })),
    map((descriptor) => parseDescriptor(descriptor, { parseFieldValueTypes: options?.parseFieldValueTypes ?? true }))
  );
}

/**
 * Inspects the data for getItem or getDescriptor responses and returns the inner content object
 * */
function extractContent(data) {
  let output = data;
  if (data.descriptorDom) {
    return {
      ...(data.descriptorDom.page || data.descriptorDom.component),
      path: data.url
    };
  } else if (data.page) {
    return data.page;
  } else if (data.component) {
    return data.component;
  }
  return output;
}

/**
 * Flattens a getChildren response into a flat list of content items
 * */
function extractChildren(children) {
  return children.flatMap((child) => {
    return child.children ? extractChildren(child.children) : child;
  });
}

const propsToRemove = [
  'rootId',
  'crafterSite',
  'crafterPublishedDate',
  'crafterPublishedDate_dt',
  'inheritsFrom_smv'
];
export function preParseSearchResults<T extends object = {}>(source: T): ContentInstance {
  Object.entries(source).forEach(([prop, value]) => {
    if (propsToRemove.includes(prop)) {
      delete source[prop];
    } else if (prop.endsWith('_o')) {
      const collection = value as { item: any | any[] };
      if (!Array.isArray(collection.item)) {
        source[prop] = { item: [collection.item] };
      }
      source[prop].item.forEach((item, i) => {
        source[prop].item[i] = preParseSearchResults(item);
        if (item.component) {
          source[prop].item[i].component = preParseSearchResults(item.component);
        }
      });
    }
  });
  return source as ContentInstance;
}
