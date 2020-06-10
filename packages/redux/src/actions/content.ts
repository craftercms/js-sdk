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

import { Descriptor, Item, NavigationItem } from '@craftercms/models';

export const GET_ITEM = 'CRAFTERCMS_GET_ITEM';
export const GET_ITEM_COMPLETE = 'CRAFTERCMS_GET_ITEM_COMPLETE';
export const GET_DESCRIPTOR = 'CRAFTERCMS_GET_DESCRIPTOR';
export const GET_DESCRIPTOR_COMPLETE = 'CRAFTERCMS_GET_DESCRIPTOR_COMPLETE';
export const GET_CHILDREN = 'CRAFTERCMS_GET_CHILDREN';
export const GET_CHILDREN_COMPLETE = 'CRAFTERCMS_GET_CHILDREN_COMPLETE';
export const GET_TREE = 'CRAFTERCMS_GET_TREE';
export const GET_TREE_COMPLETE = 'CRAFTERCMS_GET_TREE_COMPLETE';

export const GET_NAV = 'CRAFTERCMS_GET_NAV';
export const GET_NAV_COMPLETE = 'CRAFTERCMS_GET_NAV_COMPLETE';
export const GET_NAV_BREADCRUMB = 'CRAFTERCMS_GET_NAV_BREADCRUMB';
export const GET_NAV_BREADCRUMB_COMPLETE = 'CRAFTERCMS_GET_NAV_BREADCRUMB_COMPLETE';

export function getItem(itemUrl: string) {
  return {
    type: GET_ITEM,
    payload: itemUrl
  }
}

export function getItemComplete(itemData: {
  url: string,
  item?: Item
}) {
  return {
    type: GET_ITEM_COMPLETE,
    payload: itemData
  }
}

export function getDescriptor(url: string) {
  return {
    type: GET_DESCRIPTOR,
    payload: url
  }
}

export function getDescriptorComplete(descriptorData: {
  url: string,
  descriptor?: Descriptor
}) {
  return {
    type: GET_DESCRIPTOR_COMPLETE,
    payload: descriptorData
  }
}

export function getChildren(url: string) {
  return {
    type: GET_CHILDREN,
    payload: url
  }
}

export function getChildrenComplete(childrenData: {
  url: string,
  children?: Array<Item>,
}) {
  return {
    type: GET_CHILDREN_COMPLETE,
    payload: childrenData
  }
}

export function getTree(url: string);
export function getTree(url: string, depth: Number);
export function getTree(url: string, depth: Number = 1) {
  return {
    type: GET_TREE,
    payload: {
      url,
      depth
    }
  }
}

export function getTreeComplete(treeData: {
  url: string,
  tree?: Item
}) {
  return {
    type: GET_TREE_COMPLETE,
    payload: treeData
  }
}

export function getNav(url: string);
export function getNav(url: string, depth: Number);
export function getNav(url: string, depth: Number, currentPageUrl: string)
export function getNav(url: string, depth: Number = 1, currentPageUrl: string = '') {
  return {
    type: GET_NAV,
    payload: {
      url,
      depth,
      currentPageUrl
    }
  }
}

export function getNavComplete(navData: {
  url: string,
  nav?: NavigationItem
}) {
  return {
    type: GET_NAV_COMPLETE,
    payload: navData
  }
}

export function getNavBreadcrumb(url: string);
export function getNavBreadcrumb(url: string, root: string);
export function getNavBreadcrumb(url: string, root: string = '') {
  return {
    type: GET_NAV_BREADCRUMB,
    payload: {
      url,
      root
    }
  }
}

export function getNavBreadcrumbComplete(navBreadcrumbData: {
  url: string,
  breadcrumb?: Array<NavigationItem>
}) {
  return {
    type: GET_NAV_BREADCRUMB_COMPLETE,
    payload: navBreadcrumbData
  }
}
