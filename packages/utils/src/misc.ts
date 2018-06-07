export function composeUrl(baseUrl: string, endpoint: string): string;
export function composeUrl(studioConfig: { baseUrl }, endpoint: string): string;
export function composeUrl(studioConfigOrBaseUrl: string | { baseUrl }, endpoint: string): String {
  return `${typeof studioConfigOrBaseUrl === 'string' ? studioConfigOrBaseUrl : studioConfigOrBaseUrl.baseUrl}/${endpoint}`;
}
