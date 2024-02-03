import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationControllerService} from "./api/services/authentication-controller.service";
import {LoginBody} from "./api/models/login-body";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userProfileUrl = 'http://localhost:8080/auth/me';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private authControllerService: AuthenticationControllerService, private http: HttpClient) {
    this.checkTokenValidity();
  }

  validateToken(): Observable<boolean> {
    if (!this.getToken()) {
      return of(false);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      })
    };

    return this.http.get(this.userProfileUrl, httpOptions).pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    const loginBody: LoginBody = {
      username: username,
      password: password
    };

    return this.authControllerService.loginUser({ body: loginBody }).pipe(
      map(response => {
        if (response.jwt) {
          localStorage.setItem('jwtToken', response.jwt);
          this.isLoggedInSubject.next(true);
        }
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    let booleanObservable = this.isLoggedInSubject.asObservable();
    booleanObservable.subscribe(value => console.log("is token valid: " + value))
    return booleanObservable;
  }

  private getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  private checkTokenValidity(): void {
    const token = this.getToken();
    if (token) {
      this.validateToken().subscribe(isValid => {
        this.isLoggedInSubject.next(isValid);
        if (!isValid) {
          this.logout();
        }
      });
    }
  }
}
