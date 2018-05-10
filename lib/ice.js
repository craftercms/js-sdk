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

/**
 * In Context Editing Utitly class, this is a fallback for plain javascript sites and should not be
 * used for React or Angular.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ICE = function () {
    function ICE() {
        _classCallCheck(this, ICE);
    }

    _createClass(ICE, [{
        key: 'addGroup',


        /**
         * Adds the appropiate attributes to display the pencil for an ICE Group.
         * @param {string} id - ID of the HTML element
         * @param {string} group - Name of the ICE Group
         * @param {string} label - Label of the ICE Group
         */
        value: function addGroup(id, group, label) {
            var element = document.getElementById(id);
            if (element) {
                element.setAttribute('data-studio-ice', group);
                element.setAttribute('data-studio-ice-label', label || group);
            } else {
                console.error('Could not add ICE group to element #' + id);
            }
        }

        /**
         * Adds the appropiate attributes to display the pencil for a site component.
         * @param {string} id - ID of the HTML element
         * @param {string} path - Path of the site component
         * @param {string} label - Label of the site component
         */

    }, {
        key: 'addPath',
        value: function addPath(id, path, label) {
            var element = document.getElementById(id);
            if (element) {
                element.setAttribute('data-studio-ice', '');
                element.setAttribute('data-studio-ice-path', path);
                element.setAttribute('data-studio-ice-label', label || path);
            } else {
                console.error('Could not add ICE path to element #' + id);
            }
        }

        /**
         * Updates the pencils according to all HTML attributes present in the page.
         * This method needs to be called after all changes to groups/components have been made.
         */

    }, {
        key: 'update',
        value: function update() {
            if (window.studioICERepaint) {
                window.studioICERepaint();
            }
        }

        /**
         * Loads the scripts required for ICE group/components to work properly in the Crafter Studio Preview.
         * This method needs to be called once the page is loaded.
         */

    }, {
        key: 'addToolSupport',
        value: function addToolSupport() {
            var element = document.createElement('script');
            element.setAttribute('data-main', '/studio/overlayhook?cs.js');
            element.src = '/studio/static-assets/libs/requirejs/require.js';
            document.getElementsByTagName('body')[0].appendChild(element);
        }
    }]);

    return ICE;
}();

var InContextEditing = new ICE();

exports.InContextEditing = InContextEditing;