/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Inventory } from '../../models/inventory';

export interface GetProductInventory$Params {
  id: number;
}

export function getProductInventory(http: HttpClient, rootUrl: string, params: GetProductInventory$Params, context?: HttpContext): Observable<StrictHttpResponse<Inventory>> {
  const rb = new RequestBuilder(rootUrl, getProductInventory.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Inventory>;
    })
  );
}

getProductInventory.PATH = '/product/{id}/inventory';
