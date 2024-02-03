/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageProduct } from '../../models/page-product';

export interface GetProducts$Params {
  searchTerm?: string;
  page?: number;
  size?: number;
}

export function getProducts(http: HttpClient, rootUrl: string, params?: GetProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageProduct>> {
  const rb = new RequestBuilder(rootUrl, getProducts.PATH, 'get');
  if (params) {
    rb.query('searchTerm', params.searchTerm, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageProduct>;
    })
  );
}

getProducts.PATH = '/product';
