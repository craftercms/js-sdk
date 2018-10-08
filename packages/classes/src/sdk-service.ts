import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import 'url-search-params-polyfill';

export class SDKService {

  static httpGet(requestURL: string, params: Object = {}): Observable<any> {
    const searchParams = new URLSearchParams(params as URLSearchParams);
      
    return ajax.get(`${requestURL}?${searchParams.toString()}`)
      .pipe(
        map((ajaxResponse: AjaxResponse) => ajaxResponse.response)
      );
  }

  static httpPost(requestURL: string, body: Object = {}): Observable<any> {
    return ajax.post(requestURL, body)
      .pipe(map((ajaxResponse: AjaxResponse) => ajaxResponse.response));
  }

}
