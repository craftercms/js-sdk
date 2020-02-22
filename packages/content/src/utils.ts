/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { ContentInstance, Descriptor, Item } from '@craftercms/models';

interface GraphQLResponse {
  [root: string]: {
    // Repeating groups & node selectors collection root
    item?:
      object[] |
      Array<{
        key: string;
        value: string;
        component: unknown;
      }>
    // Other field types
    [contentTypeField: string]: unknown
  }
}

type DescriptorResponse = Descriptor | Item | GraphQLResponse;

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

export function parseDescriptor(data: DescriptorResponse | DescriptorResponse[]): ContentInstance | ContentInstance[] {
  if (data == null) {
    return null;
  } else if (Array.isArray(data)) {
    return data.map((item) => parseDescriptor(item) as ContentInstance);
  } else if (data.descriptorDom) {
    return parseDescriptor(data.descriptorDom);
  } else if (data.page) {
    return parseDescriptor(data.page);
  } else if (data.component) {
    return parseDescriptor(data.component);
  }
  let parsed: ContentInstance = {
    craftercms: {
      id: null,
      path: null,
      label: null,
      contentTypeId: null,
      dateCreated: null,
      dateModified: null
    }
  };
  Object.entries(data).forEach(([prop, value]) => {
    if (systemProps.includes(prop)) {
      parsed.craftercms[systemPropMap[prop] ?? prop] = value;
    } else if (prop.endsWith('_o')) {
      parsed[prop] = value?.item ?? [];
      if (parsed[prop][0]?.component) {
        parsed[prop] = parsed[prop].map(({ key, value, component }) => {
          const newComponent = {
            label: value,
            ...component,
            path: key.startsWith('/') ? key : null
          };
          return parseDescriptor(newComponent);
        });
      }
    } else {
      parsed[prop] = value ?? null;
    }
  });
  return parsed;
}
