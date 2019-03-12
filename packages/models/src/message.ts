/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All rights reserved.
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

export enum MessageScope {
  ALL = 'ALL',
  Local = 'LOCAL',
  External = 'EXTERNAL',
  Broadcast = 'BROADCAST'
}

export enum MessageTopic {

  ALL = 'ALL',

  GUEST_CHECK_IN = 'GUEST_CHECK_IN',
  GUEST_LOAD_EVENT = 'GUEST_LOAD_EVENT',
  GUEST_SITE_LOAD = 'GUEST_SITE_LOAD',

  // HOST_ICE_START_REQUEST = 'HOST_ICE_START_REQUEST',
  // HOST_END_ICE_REQUEST = 'HOST_END_ICE_REQUEST',
  // HOST_RELOAD_REQUEST = 'HOST_RELOAD_REQUEST',
  IS_REVIEWER = 'IS_REVIEWER',
  INIT_ICE_REGIONS = 'INIT_ICE_REGIONS',
  HOST_ICE_START_REQUEST = 'ICE_TOOLS_ON',
  HOST_END_ICE_REQUEST = 'ICE_TOOLS_OFF',
  ICE_ZONE_ON = 'ICE_ZONE_ON',
  HOST_RELOAD_REQUEST = 'REFRESH_PREVIEW',
  HOST_NAV_REQUEST = 'HOST_NAV_REQUEST',

  NAV_REQUEST = 'NAV_REQUEST',

  PROJECT_CREATED = 'PROJECT_CREATED',
  PROJECT_UPDATED = 'PROJECT_UPDATED',
  PROJECT_DELETED = 'PROJECT_DELETED',

  DND_REORDER = 'DND_REORDER',
  START_DRAG_AND_DROP = 'START_DRAG_AND_DROP',
  DND_COMPONENTS_PANEL_OFF = 'DND_COMPONENTS_PANEL_OFF',
  REORDER_COMPLETE = 'REORDER_COMPLETE'

}

export interface Message {
  topic: MessageTopic;
  data: any;
  message?: any;
  scope: MessageScope;
}
