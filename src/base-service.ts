import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { StudioConfig } from './studio-config';

export class BaseService {
  protected constructor(public config: StudioConfig) {

  }

  static httpGet(requestURL: string, params: Object = {}): Observable {
    const searchParams = new URLSearchParams(params as URLSearchParams);
    return ajax.get(`${requestURL}${searchParams.toString()}`);
  }

  static httpPost(requestURL: string, body: Object = {}): Observable {
    return ajax.post(requestURL, body);
  }

}
