export function log(message: string, type: string = log.DEFAULT) {
  console && (console[type] && console[type](message) || console.log && console.log(message));
}

export namespace log {
  export const DEFAULT = 'log';
  export const ERROR = 'error';
  export const WARN = 'warn';
}
