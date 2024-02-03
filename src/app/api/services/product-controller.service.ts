/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getProducts } from '../fn/product-controller/get-products';
import { GetProducts$Params } from '../fn/product-controller/get-products';
import { PageProduct } from '../models/page-product';

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

}
