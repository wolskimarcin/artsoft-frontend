/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LocalUser } from '../../models/local-user';

export interface GetLoggedInUserProfile$Params {
}

export function getLoggedInUserProfile(http: HttpClient, rootUrl: string, params?: GetLoggedInUserProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<LocalUser>> {
  const rb = new RequestBuilder(rootUrl, getLoggedInUserProfile.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LocalUser>;
    })
  );
}

getLoggedInUserProfile.PATH = '/auth/me';
