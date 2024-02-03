/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WebOrder } from '../../models/web-order';

export interface GetOrders$Params {
}

export function getOrders(http: HttpClient, rootUrl: string, params?: GetOrders$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WebOrder>>> {
  const rb = new RequestBuilder(rootUrl, getOrders.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<WebOrder>>;
    })
  );
}

getOrders.PATH = '/order';
