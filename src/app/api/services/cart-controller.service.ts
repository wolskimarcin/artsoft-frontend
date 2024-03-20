/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addProductToCart } from '../fn/cart-controller/add-product-to-cart';
import { AddProductToCart$Params } from '../fn/cart-controller/add-product-to-cart';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { CartSummary } from '../models/cart-summary';
import { getCartSummary } from '../fn/cart-controller/get-cart-summary';
import { GetCartSummary$Params } from '../fn/cart-controller/get-cart-summary';
import { getCurrentCart } from '../fn/cart-controller/get-current-cart';
import { GetCurrentCart$Params } from '../fn/cart-controller/get-current-cart';
import { removeCartItem } from '../fn/cart-controller/remove-cart-item';
import { RemoveCartItem$Params } from '../fn/cart-controller/remove-cart-item';
import { updateCartItem } from '../fn/cart-controller/update-cart-item';
import { UpdateCartItem$Params } from '../fn/cart-controller/update-cart-item';

@Injectable({ providedIn: 'root' })
export class CartControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateCartItem()` */
  static readonly UpdateCartItemPath = '/cart/item/{itemId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCartItem()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCartItem$Response(params: UpdateCartItem$Params, context?: HttpContext): Observable<StrictHttpResponse<CartItem>> {
    return updateCartItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCartItem$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCartItem(params: UpdateCartItem$Params, context?: HttpContext): Observable<CartItem> {
    return this.updateCartItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<CartItem>): CartItem => r.body)
    );
  }

  /** Path part for operation `removeCartItem()` */
  static readonly RemoveCartItemPath = '/cart/item/{itemId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeCartItem()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCartItem$Response(params: RemoveCartItem$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return removeCartItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeCartItem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCartItem(params: RemoveCartItem$Params, context?: HttpContext): Observable<{
}> {
    return this.removeCartItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `addProductToCart()` */
  static readonly AddProductToCartPath = '/cart/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProductToCart()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProductToCart$Response(params: AddProductToCart$Params, context?: HttpContext): Observable<StrictHttpResponse<CartItem>> {
    return addProductToCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addProductToCart$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProductToCart(params: AddProductToCart$Params, context?: HttpContext): Observable<CartItem> {
    return this.addProductToCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<CartItem>): CartItem => r.body)
    );
  }

  /** Path part for operation `getCurrentCart()` */
  static readonly GetCurrentCartPath = '/cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentCart$Response(params?: GetCurrentCart$Params, context?: HttpContext): Observable<StrictHttpResponse<Cart>> {
    return getCurrentCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCurrentCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentCart(params?: GetCurrentCart$Params, context?: HttpContext): Observable<Cart> {
    return this.getCurrentCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<Cart>): Cart => r.body)
    );
  }

  /** Path part for operation `getCartSummary()` */
  static readonly GetCartSummaryPath = '/cart/summary';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCartSummary()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartSummary$Response(params?: GetCartSummary$Params, context?: HttpContext): Observable<StrictHttpResponse<CartSummary>> {
    return getCartSummary(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCartSummary$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartSummary(params?: GetCartSummary$Params, context?: HttpContext): Observable<CartSummary> {
    return this.getCartSummary$Response(params, context).pipe(
      map((r: StrictHttpResponse<CartSummary>): CartSummary => r.body)
    );
  }

}
