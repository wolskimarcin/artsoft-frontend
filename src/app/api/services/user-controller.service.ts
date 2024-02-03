/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Address } from '../models/address';
import { getAddress } from '../fn/user-controller/get-address';
import { GetAddress$Params } from '../fn/user-controller/get-address';
import { patchAddress } from '../fn/user-controller/patch-address';
import { PatchAddress$Params } from '../fn/user-controller/patch-address';
import { putAddress } from '../fn/user-controller/put-address';
import { PutAddress$Params } from '../fn/user-controller/put-address';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAddress()` */
  static readonly GetAddressPath = '/user/{userId}/address';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAddress()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAddress$Response(params: GetAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Address>>> {
    return getAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAddress$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAddress(params: GetAddress$Params, context?: HttpContext): Observable<Array<Address>> {
    return this.getAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Address>>): Array<Address> => r.body)
    );
  }

  /** Path part for operation `putAddress()` */
  static readonly PutAddressPath = '/user/{userId}/address';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putAddress$Response(params: PutAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<Address>> {
    return putAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `putAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putAddress(params: PutAddress$Params, context?: HttpContext): Observable<Address> {
    return this.putAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<Address>): Address => r.body)
    );
  }

  /** Path part for operation `patchAddress()` */
  static readonly PatchAddressPath = '/user/{userId}/address/{addressId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `patchAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchAddress$Response(params: PatchAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<Address>> {
    return patchAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `patchAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchAddress(params: PatchAddress$Params, context?: HttpContext): Observable<Address> {
    return this.patchAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<Address>): Address => r.body)
    );
  }

}
