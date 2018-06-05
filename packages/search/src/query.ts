// TODO add return types

/**
 * Query Object
 */
export class Query {

  /**
   * Creates an empty query
   * @constructor
   */
  constructor(public params: Object = {}) {

  }

  /**
   * Sets a single value parameter in the query object
   * @param {string} name - Name of the parameter
   * @param {object} value - Value of the parameter
   */
  setParam(name, value) {
    this.params[name] = value;
  }

  /**
   * Adds a value for a parameter in the query object
   * @param {string} name - Name of the parameter
   * @param {object} value - Value of the parameter
   */
  addParam(name, value) {
    if (this.params[name]) {
      if (Array.isArray(this.params[name])) {
        this.params[name].push(value);
      } else {
        this.params[name] = [this.params[name], value];
      }
    } else {
      this.params[name] = value;
    }
  }

}
