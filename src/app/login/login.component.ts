import {Component} from '@angular/core';
import {LoginBody} from '../api/model/loginBody';
import {Router} from '@angular/router';
import {AuthenticationControllerService} from "../api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationControllerService, private router: Router) {
  }

  onLogin(): void {
    const loginData: LoginBody = {username: this.username, password: this.password};
    this.authService.loginUser(loginData).subscribe({
      next: (response: any) => {
        localStorage.setItem('jwtToken', response.jwt);
        this.router.navigate(['/products']);
      },
      error: (error: any) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      }
    });
  }
}
