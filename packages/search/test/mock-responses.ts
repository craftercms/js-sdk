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

export const searchResponse = {
    "responseHeader": {
      "status": 0,
      "QTime": 1,
      "params": {
        "q": "*",
        "fl": "localId",
        "fq": [
          "content-type:\"page/article\"",
          "-disabled:\"true\"",
          "-expired_dt:[* TO NOW]"
        ],
        "index_id": "editorial",
        "rows": "2",
        "wt": "javabin",
        "version": "2"
      }
    },
    "response": {
      "start": 0,
      "maxScore": null,
      "numFound": 9,
      "documents": [
        {
          "localId": "/site/website/articles/2017/1/men-styles-for-winter/index.xml"
        },
        {
          "localId": "/site/website/articles/2017/1/women-styles-for-winter/index.xml"
        }
      ]
    }
};
