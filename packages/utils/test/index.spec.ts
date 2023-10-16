/*
 * Copyright (C) 2007-2023 Crafter Software Corporation. All Rights Reserved.
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

import { crafterConf } from '@craftercms/classes';
import {
  composeUrl,
  createLookupTable,
  extendDeep,
  isPlainObject,
  notNullOrUndefined,
  nullOrUndefined
} from '@craftercms/utils';
import { expect } from 'chai';

crafterConf.configure({
  baseUrl: 'http://localhost:8080',
  site: 'editorial'
});

describe('Utilities', () => {
  describe('composeUrl utility', () => {
    it('should compose a url with a base url or a crafterConfig and an endpoint', () => {
      const url = composeUrl('http://localhost:8080/', 'api/1/site');
      const url2 = composeUrl(crafterConf.getConfig(), 'api/1/site');
      const expectedUrl = 'http://localhost:8080/api/1/site';
      expect(url).to.equal(expectedUrl);
      expect(url2).to.equal(expectedUrl);
    });
  });

  describe('isPlainObject utility', () => {
    it('should return true if the object is a plain object', () => {
      expect(isPlainObject({})).to.be.true;
      expect(isPlainObject({ a: 1 })).to.be.true;
      expect(isPlainObject(null)).to.be.false;
      expect(isPlainObject(undefined)).to.be.false;
      expect(isPlainObject([])).to.be.false;
      expect(isPlainObject('test')).to.be.false;
    });
  });

  describe('extendDeep utility', () => {
    it('should extend the target object with the source object', () => {
      const source = { a: 1, b: 2 };
      const target = { b: 3, c: 4 };
      expect(extendDeep(target, source)).to.deep.equal({ b: 2, c: 4, a: 1 });
    });
  });

  describe('nullOrUndefined utility', () => {
    it('should return true if the value is null or undefined', () => {
      expect(nullOrUndefined(null)).to.be.true;
      expect(nullOrUndefined(undefined)).to.be.true;
      expect(nullOrUndefined('test')).to.be.false;
    });
  });

  describe('notNullOrUndefined utility', () => {
    it('should return true if the value is neither null nor undefined', () => {
      expect(notNullOrUndefined(null)).to.be.false;
      expect(notNullOrUndefined(undefined)).to.be.false;
      expect(notNullOrUndefined('test')).to.be.true;
    });
  });

  describe('createLookupTable utility', () => {
    it('should create a lookup table from a list of objects', () => {
      const list = [
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' }
      ];
      const table1 = {
        1: { id: 1, name: 'test1' },
        2: { id: 2, name: 'test2' },
        3: { id: 3, name: 'test3' }
      };
      const table2 = {
        test1: { id: 1, name: 'test1' },
        test2: { id: 2, name: 'test2' },
        test3: { id: 3, name: 'test3' }
      };

      const lookupTableById = createLookupTable(list);
      const lookupTableByName = createLookupTable(list, 'name');
      expect(lookupTableById).to.deep.equal(table1);
      expect(lookupTableByName).to.deep.equal(table2);
    });
  });
});
