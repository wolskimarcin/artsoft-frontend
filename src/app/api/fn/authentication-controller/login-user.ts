/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LoginBody } from '../../models/login-body';
import { LoginResponse } from '../../models/login-response';

export interface LoginUser$Params {
      body: LoginBody
}

export function loginUser(http: HttpClient, rootUrl: string, params: LoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginResponse>> {
  const rb = new RequestBuilder(rootUrl, loginUser.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LoginResponse>;
    })
  );
}

loginUser.PATH = '/auth/login';
