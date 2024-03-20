/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getProductDetails } from '../fn/product-controller/get-product-details';
import { GetProductDetails$Params } from '../fn/product-controller/get-product-details';
import { getProductInventory } from '../fn/product-controller/get-product-inventory';
import { GetProductInventory$Params } from '../fn/product-controller/get-product-inventory';
import { getProducts } from '../fn/product-controller/get-products';
import { GetProducts$Params } from '../fn/product-controller/get-products';
import { Inventory } from '../models/inventory';
import { PageProduct } from '../models/page-product';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getProducts()` */
  static readonly GetProductsPath = '/product';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProducts$Response(params?: GetProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageProduct>> {
    return getProducts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProducts(params?: GetProducts$Params, context?: HttpContext): Observable<PageProduct> {
    return this.getProducts$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageProduct>): PageProduct => r.body)
    );
  }

  /** Path part for operation `getProductDetails()` */
  static readonly GetProductDetailsPath = '/product/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductDetails$Response(params: GetProductDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<Product>> {
    return getProductDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductDetails(params: GetProductDetails$Params, context?: HttpContext): Observable<Product> {
    return this.getProductDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<Product>): Product => r.body)
    );
  }

  /** Path part for operation `getProductInventory()` */
  static readonly GetProductInventoryPath = '/product/{id}/inventory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductInventory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductInventory$Response(params: GetProductInventory$Params, context?: HttpContext): Observable<StrictHttpResponse<Inventory>> {
    return getProductInventory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductInventory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductInventory(params: GetProductInventory$Params, context?: HttpContext): Observable<Inventory> {
    return this.getProductInventory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Inventory>): Inventory => r.body)
    );
  }

}
