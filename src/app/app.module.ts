import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ProductsComponent} from './products/products.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RegistrationComponent} from './registration/registration.component';
import {JwtInterceptor} from "./interceptors/jwt-interceptor.service";
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    UserProfileComponent,
    RegistrationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormField,
    MatInput,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
