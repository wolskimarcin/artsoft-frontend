/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CartItem } from '../../models/cart-item';
import { CartItemRequest } from '../../models/cart-item-request';

export interface AddProductToCart$Params {
      body: CartItemRequest
}

export function addProductToCart(http: HttpClient, rootUrl: string, params: AddProductToCart$Params, context?: HttpContext): Observable<StrictHttpResponse<CartItem>> {
  const rb = new RequestBuilder(rootUrl, addProductToCart.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CartItem>;
    })
  );
}

addProductToCart.PATH = '/cart/add';
