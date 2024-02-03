import {Component} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'artsoft-frontend';
  itemCount: number = 0; // TODO: Update based on actual cart items
  totalPrice: number = 0.00; // TODO: Update based on actual cart items total price

  constructor(public authService: AuthService) {
  }
}
