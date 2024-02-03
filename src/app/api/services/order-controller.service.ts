/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getOrders } from '../fn/order-controller/get-orders';
import { GetOrders$Params } from '../fn/order-controller/get-orders';
import { WebOrder } from '../models/web-order';

@Injectable({ providedIn: 'root' })
export class OrderControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getOrders()` */
  static readonly GetOrdersPath = '/order';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders$Response(params?: GetOrders$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WebOrder>>> {
    return getOrders(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders(params?: GetOrders$Params, context?: HttpContext): Observable<Array<WebOrder>> {
    return this.getOrders$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WebOrder>>): Array<WebOrder> => r.body)
    );
  }

}
