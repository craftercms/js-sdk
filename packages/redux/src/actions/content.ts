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

import { Descriptor, Item, NavigationItem } from '@craftercms/models';
import { createAction } from "@reduxjs/toolkit";

export const getItem = /*#__PURE__*/ createAction<string>('GET_ITEM');

export const getItemComplete = /*#__PURE__*/ createAction<{ url: string, item?: Item }>('GET_ITEM_COMPLETE');

export const getDescriptor = /*#__PURE__*/ createAction<string>('GET_DESCRIPTOR');

export const getDescriptorComplete = /*#__PURE__*/ createAction<{ url: string, descriptor?: Descriptor }>('GET_DESCRIPTOR_COMPLETE');

export const getChildren = /*#__PURE__*/ createAction<string>('GET_CHILDREN');

export const getChildrenComplete = /*#__PURE__*/ createAction<{ url: string, children?: Array<Item> }>('GET_CHILDREN_COMPLETE');

export const getTree = /*#__PURE__*/ createAction<{ url: string, depth?: Number }>('GET_TREE');

export const getTreeComplete = /*#__PURE__*/ createAction<{ url: string, tree?: Item }>('GET_TREE_COMPLETE');

export const getNav = /*#__PURE__*/ createAction<{ url: string, depth?: Number, currentPageUrl?: string }>('GET_NAV');

export const getNavComplete = /*#__PURE__*/ createAction<{ url: string, nav?: NavigationItem }>('GET_NAV_COMPLETE');

export const getNavBreadcrumb = /*#__PURE__*/ createAction<{ url: string, root?: string }>('GET_NAV_BREADCRUMB');

export const getNavBreadcrumbComplete = /*#__PURE__*/ createAction<{ url: string, breadcrumb?: Array<NavigationItem> }>('GET_NAV_BREADCRUMB_COMPLETE');
