import { Descriptor, Item } from '@craftercms/models';

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

// TODO:
// * Give semantic names and add type to all action params

export function getItem(itemUrl: string) {
  return {
    type: GET_ITEM,
    payload: itemUrl
  }
}

export function getItemComplete(item: Item) {
  return {
    type: GET_ITEM_COMPLETE,
    payload: item
  }
}

export function getDescriptor() {
  return {
    type: GET_DESCRIPTOR
  }
}

export function getDescriptorComplete(descriptor: Descriptor) {
  return {
    type: GET_CHILDREN_COMPLETE,
    payload: descriptor
  }
}

export function getChildren() {
  return {
    type: GET_CHILDREN
  }
}

export function getChildrenComplete(payload) {
  return {
    type: GET_CHILDREN_COMPLETE,
    payload
  }
}

export function getTree() {
  return {
    type: GET_TREE
  }
}

export function getTreeComplete(payload) {
  return {
    type: GET_TREE_COMPLETE,
    payload
  }
}

export function getNav() {
  return {
    type: GET_NAV
  }
}

export function getNavComplete(payload) {
  return {
    type: GET_NAV_COMPLETE,
    payload
  }
}

export function getNavBreadcrumb() {
  return {
    type: GET_NAV_BREADCRUMB
  }
}

export function getNavBreadcrumbComplete(payload) {
  return {
    type: GET_NAV_BREADCRUMB_COMPLETE,
    payload
  }
}
