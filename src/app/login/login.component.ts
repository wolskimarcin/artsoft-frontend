import {Component} from '@angular/core';
import {LoginBody} from '../api';
import {Router} from '@angular/router';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin(): void {
    const loginData: LoginBody = {username: this.username, password: this.password};
    this.authService.login(loginData.username, loginData.password).subscribe({
      next: (response: any) => {
        this.router.navigate(['/products'])
      },
      error: (error: any) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      }
    });
  }
}
