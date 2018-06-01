/*
 * Copyright (C) 2007-2018 Crafter Software Corporation. All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */

import { StudioConfig } from './studio-config';

export function composeUrl(baseUrl: string, endpoint: string): string;
export function composeUrl(config: StudioConfig, endpoint: string): string;
export function composeUrl(configOrBase: string | StudioConfig, endpoint: string): String {
  return `${typeof configOrBase === 'string' ? configOrBase : configOrBase.baseUrl}/${endpoint}`;
}
