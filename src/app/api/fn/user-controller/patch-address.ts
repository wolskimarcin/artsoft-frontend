/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Address } from '../../models/address';

export interface PatchAddress$Params {
  userId: number;
  addressId: number;
      body: Address
}

export function patchAddress(http: HttpClient, rootUrl: string, params: PatchAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<Address>> {
  const rb = new RequestBuilder(rootUrl, patchAddress.PATH, 'patch');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.path('addressId', params.addressId, {});
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

patchAddress.PATH = '/user/{userId}/address/{addressId}';
