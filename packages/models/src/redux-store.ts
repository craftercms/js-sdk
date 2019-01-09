/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Item, LookupTable } from '@craftercms/models';

export interface StateContainer<T> {
  entries: LookupTable<T>;
  loading: LookupTable<boolean>;
  childIds?: LookupTable<string | number>;
}

export interface CrafterState {
  items?: StateContainer<Item>;
  [prop: string]: any;
}

export interface CrafterNamespacedState extends CrafterState {
  craftercms?: CrafterState;
  [prop: string]: any;
}
