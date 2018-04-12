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

'use strict';

import axios from 'axios';

// Utility functions

export function httpGet(baseUrl, url, params, callback) {
    var opts = {
        method: 'get',
        baseUrl: baseUrl,
        url: url,
        params: params
    };

    axios(opts).then(function(response) {
        callback(null, response.data);
    }).catch(function(error) {
        callback({ status: error.response.status, data: error.response.data }, null);
    });
};
