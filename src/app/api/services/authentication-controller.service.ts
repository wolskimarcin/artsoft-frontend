/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { forgotPassword } from '../fn/authentication-controller/forgot-password';
import { ForgotPassword$Params } from '../fn/authentication-controller/forgot-password';
import { getLoggedInUserProfile } from '../fn/authentication-controller/get-logged-in-user-profile';
import { GetLoggedInUserProfile$Params } from '../fn/authentication-controller/get-logged-in-user-profile';
import { LocalUser } from '../models/local-user';
import { LoginResponse } from '../models/login-response';
import { loginUser } from '../fn/authentication-controller/login-user';
import { LoginUser$Params } from '../fn/authentication-controller/login-user';
import { registerUser } from '../fn/authentication-controller/register-user';
import { RegisterUser$Params } from '../fn/authentication-controller/register-user';
import { resetPassword } from '../fn/authentication-controller/reset-password';
import { ResetPassword$Params } from '../fn/authentication-controller/reset-password';
import { verifyEmail } from '../fn/authentication-controller/verify-email';
import { VerifyEmail$Params } from '../fn/authentication-controller/verify-email';

@Injectable({ providedIn: 'root' })
export class AuthenticationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `verifyEmail()` */
  static readonly VerifyEmailPath = '/auth/verify';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyEmail$Response(params: VerifyEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return verifyEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `verifyEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyEmail(params: VerifyEmail$Params, context?: HttpContext): Observable<string> {
    return this.verifyEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `resetPassword()` */
  static readonly ResetPasswordPath = '/auth/reset';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPassword$Response(params: ResetPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return resetPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPassword(params: ResetPassword$Params, context?: HttpContext): Observable<string> {
    return this.resetPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `registerUser()` */
  static readonly RegisterUserPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser$Response(params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return registerUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser(params: RegisterUser$Params, context?: HttpContext): Observable<string> {
    return this.registerUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `loginUser()` */
  static readonly LoginUserPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginUser$Response(params: LoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginResponse>> {
    return loginUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginUser(params: LoginUser$Params, context?: HttpContext): Observable<LoginResponse> {
    return this.loginUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginResponse>): LoginResponse => r.body)
    );
  }

  /** Path part for operation `forgotPassword()` */
  static readonly ForgotPasswordPath = '/auth/forgot';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword$Response(params: ForgotPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return forgotPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword(params: ForgotPassword$Params, context?: HttpContext): Observable<string> {
    return this.forgotPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getLoggedInUserProfile()` */
  static readonly GetLoggedInUserProfilePath = '/auth/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLoggedInUserProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoggedInUserProfile$Response(params?: GetLoggedInUserProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<LocalUser>> {
    return getLoggedInUserProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLoggedInUserProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoggedInUserProfile(params?: GetLoggedInUserProfile$Params, context?: HttpContext): Observable<LocalUser> {
    return this.getLoggedInUserProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<LocalUser>): LocalUser => r.body)
    );
  }

}
