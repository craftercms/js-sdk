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

export interface ContentInstanceSystemProps {
  id: string;
  path: string | null;
  label: string; // Internal name
  dateCreated: string;
  dateModified: string;
  contentTypeId: string;
  sourceMap?: Record<string, string>; // { fieldId: path }
  disabled: boolean;
  orderInNav?: number;
  placeInNav?: boolean;
}

export interface ContentInstanceBase {
  craftercms: ContentInstanceSystemProps;
}

export type ContentInstance<T extends Record<string, any> = Record<string, any>> = T & ContentInstanceBase;

export default ContentInstance;
