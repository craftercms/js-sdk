export function composeUrl(baseUrl: string, endpoint: string): string;
export function composeUrl(studioConfig: { baseUrl }, endpoint: string): string;
export function composeUrl(studioConfigOrBaseUrl: string | { baseUrl }, endpoint: string): String {
  const base = (typeof studioConfigOrBaseUrl === 'string')
    ? studioConfigOrBaseUrl
    : studioConfigOrBaseUrl.baseUrl;
  return `${base}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
}
