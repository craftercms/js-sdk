export function composeUrl(baseUrl: string, endpoint: string): string;
export function composeUrl(studioConfig: { baseUrl }, endpoint: string): string;
export function composeUrl(studioConfigOrBaseUrl: string | { baseUrl }, endpoint: string): String {
  const base = (typeof studioConfigOrBaseUrl === 'string')
    ? studioConfigOrBaseUrl
    : studioConfigOrBaseUrl.baseUrl;
  return `${base}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
}

export function isPlainObject(obj) {
  return typeof obj === 'object' && obj !== null && obj.constructor == Object;
}

export function extendDeep(target, source) {
  for (let prop in source) {
    if (source.hasOwnProperty(prop)) {
      if (prop in target && isPlainObject(target[prop]) && isPlainObject(source[prop])) {
        extendDeep(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}

export function extendDeepExistingProps(target, source) {
  for (let prop in source) {
    if (prop in target && source.hasOwnProperty(prop)) {
      if (isPlainObject(target[prop]) && isPlainObject(source[prop])) {
        extendDeep(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}

export function nullOrUndefined(value: any) {
  return value == null;
}

export function notNullOrUndefined(value: any) {
  return !nullOrUndefined(value);
}

export function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}