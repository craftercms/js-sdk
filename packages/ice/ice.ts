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

import { ContentInstance } from '@craftercms/models';

declare namespace window {
  const crafterRequire: any;
}

interface BaseCrafterConfig {
  baseUrl?: string;
}

export interface ICEConfig {
  model: ContentInstance;
  parentModelId?: string;
  label?: string;
  group?: string;
  isAuthoring?: boolean;
}

export interface UseDropZoneConfig {
  model: ContentInstance;
  zoneName: string;
  isAuthoring?: boolean;
}

export interface ICEAttributes {
  'data-studio-ice': string;
  'data-studio-ice-path': string;
  'data-studio-ice-label': string;
  'data-studio-component': string;
  'data-studio-component-path': string;
  'data-studio-embedded-item-id'?: string;
}

export interface DropZoneAttributes {
  'data-studio-components-target': string,
  'data-studio-components-objectid': string,
  'data-studio-zone-content-type': string
}

const pathRegExp = /^\/(.*?)\.xml$/;
const printedErrorCache = {
  nullParentId: {},
  invalidParentId: {},
  invalidPath: {}
};

export function addAuthoringSupport(config?: BaseCrafterConfig): Promise<any> {
  config = { baseUrl: '', ...(config || {}) };
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `${config.baseUrl}/studio/static-assets/libs/requirejs/require.js`;
    script.addEventListener('load', () => {
      window.crafterRequire?.([`${config.baseUrl}/studio/overlayhook?extensionless`], () => {
        window.crafterRequire(['guest'], (guest) => {
          resolve(guest);
        });
      });
    });
    document.head.appendChild(script);
  });
}

export function getICEAttributes(config: ICEConfig);
export function getICEAttributes(
  config: ICEConfig,
  wrapperUtility: string = '[Error @ getICEAttributes]'
): ICEAttributes {

  let {
    model,
    parentModelId = null,
    label,
    isAuthoring = true,
    group = ''
  } = config;

  if (!isAuthoring) {
    return ({} as ICEAttributes);
  }

  if (label === null || label === undefined) {
    label = (model?.craftercms.label || '');
  }

  let error = false;
  const isEmbedded = model?.craftercms.path == null;
  const path = model?.craftercms.path ?? parentModelId;
  const modelId = model?.craftercms.id;

  if (isEmbedded && parentModelId == null) {
    error = true;
    (!modelId) || (printedErrorCache.nullParentId[modelId] == null) &&
    console?.error?.(
      wrapperUtility +
      'The "parentModelId" argument is required for embedded components. ' +
      'Note the value of "parentModelId" should be the *path* of it\'s top parent component. ' +
      'The error occurred with the model attached to this error.',
      model
    );
    modelId && (printedErrorCache.nullParentId[modelId] = true);
  }

  if (parentModelId != null && !pathRegExp.test(parentModelId)) {
    error = true;
    (!modelId) || (printedErrorCache.invalidParentId[modelId] == null) &&
    console?.error?.(
      wrapperUtility +
      'The "parentModelId" argument should be the "path" of it\'s top parent component. ' +
      `Provided value was "${parentModelId}" which doesn't comply with the expected format ` +
      '(i.e. \'/a/**/b.xml\'). The error occurred with the model attached to this error. ' +
      'Did you send the id (objectId) instead of the path?',
      model
    );
    modelId && (printedErrorCache.invalidParentId[modelId] = true);
  }

  // Only run this if it's not embedded. When is embedded, the prior parentModelId
  // validations would have thrown already.
  if (!isEmbedded && !pathRegExp.test(path)) {
    error = true;
    (modelId) && (printedErrorCache.invalidPath[modelId] == null) &&
    console?.error?.(
      wrapperUtility +
      'The model.craftercms.path property to be the "path" of page/component. ' +
      `Provided value was "${path}" which doesn't comply with the expected format ` +
      '(i.e. \'/a/**/b.xml\'). The error occurred with the model attached to this error. ' +
      'Check that your query includes this value and you\'re using parseDescriptor to supply ' +
      'the expected data structure for this utility.',
      model
    );
    modelId && (printedErrorCache.invalidPath[modelId] = true);
  }

  if (error) {
    return ({} as ICEAttributes);
  }

  return {
    ...isEmbedded ? { 'data-studio-embedded-item-id': modelId } : {},
    'data-studio-ice': group,
    'data-studio-ice-path': path,
    'data-studio-ice-label': label,
    'data-studio-component': path,
    'data-studio-component-path': path
  };

}

export function getDropZoneAttributes(config: UseDropZoneConfig): DropZoneAttributes {

  const { model, zoneName, isAuthoring = true } = config;

  if (!isAuthoring) {
    return ({} as DropZoneAttributes);
  }

  const modelId = model?.craftercms.id;
  const contentTypeId = model?.craftercms.contentTypeId;
  return {
    'data-studio-components-target': zoneName,
    'data-studio-components-objectid': modelId,
    'data-studio-zone-content-type': contentTypeId
  };

}

export const reportNavigation: (url: string) => void = (function () {
  let reportNavigation;
  reportNavigation = (location: string, url: string) => {
    window.crafterRequire?.(['guest'], (guest) => {
      reportNavigation = guest.reportNavigation;
      __report(url);
    });
  };
  function __report(url: string) {
    // @ts-ignore
    reportNavigation(window.location.origin, url);
  }
  return __report;
}) ();

export const repaintPencils: (() => void) = (function () {
  let repaintPencilsTimeout;
  return () => {
    clearTimeout(repaintPencilsTimeout);
    repaintPencilsTimeout = setTimeout(() => {
      window.crafterRequire?.defined('guest') && window.crafterRequire(['guest'], function ({ iceRepaint }) {
        iceRepaint();
      });
    }, 150);
  };
})();

export function fetchIsAuthoring(config?: BaseCrafterConfig): Promise<boolean> {
  config = { baseUrl: '', ...(config || {}) };
  return fetch(`${config.baseUrl}/api/1/config/preview.json`)
    .then((response) => response.json())
    .then((response) => response.preview);
}
