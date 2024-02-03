/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Address } from '../../models/address';

export interface PutAddress$Params {
  userId: number;
      body: Address
}

export function putAddress(http: HttpClient, rootUrl: string, params: PutAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<Address>> {
  const rb = new RequestBuilder(rootUrl, putAddress.PATH, 'put');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Address>;
    })
  );
}

putAddress.PATH = '/user/{userId}/address';
