/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Address } from '../../models/address';

export interface GetAddress$Params {
  userId: number;
}

export function getAddress(http: HttpClient, rootUrl: string, params: GetAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Address>>> {
  const rb = new RequestBuilder(rootUrl, getAddress.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Address>>;
    })
  );
}

getAddress.PATH = '/user/{userId}/address';
