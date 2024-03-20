/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Cart } from '../../models/cart';

export interface GetCurrentCart$Params {
}

export function getCurrentCart(http: HttpClient, rootUrl: string, params?: GetCurrentCart$Params, context?: HttpContext): Observable<StrictHttpResponse<Cart>> {
  const rb = new RequestBuilder(rootUrl, getCurrentCart.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Cart>;
    })
  );
}

getCurrentCart.PATH = '/cart';
