/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CartItem } from '../../models/cart-item';
import { CartItemRequest } from '../../models/cart-item-request';

export interface UpdateCartItem$Params {
  itemId: number;
      body: CartItemRequest
}

export function updateCartItem(http: HttpClient, rootUrl: string, params: UpdateCartItem$Params, context?: HttpContext): Observable<StrictHttpResponse<CartItem>> {
  const rb = new RequestBuilder(rootUrl, updateCartItem.PATH, 'put');
  if (params) {
    rb.path('itemId', params.itemId, {});
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

updateCartItem.PATH = '/cart/item/{itemId}';
