import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationControllerService} from "../api";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  registrationSuccess = false;
  registrationMessage = '';
  userEmail = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationControllerService
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  register(): void {
    if (this.registrationForm.valid) {
      this.userEmail = this.registrationForm.value.email;
      this.authService.registerUser(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.registrationSuccess = true; // Set this to true on success
          this.registrationMessage =
            `Almost there! 🌟 We've sent an email to ${this.userEmail} with a link to activate your account.
              Please check your inbox (and spam folder, just in case) to complete your registration.
              Can't find the email? <a href="#" (click)="resendActivationLink()">Resend Activation Link</a>.`;
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.registrationSuccess = false;
          // TODO: set a failure message or handle errors
        }
      });
    }
  }
}
