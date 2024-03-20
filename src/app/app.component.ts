import {Component} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {SharedService} from "./shared/shared.service";
import {CartControllerService} from "./api/services/cart-controller.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchTerm: string = '';
  title = 'artsoft-frontend';
  itemCount: number = 0;
  totalPrice: number = 0.00;

  constructor(public authService: AuthService, private sharedService: SharedService, private cartService: CartControllerService, private router: Router) {
  }

  loadCartSummary(): void {
    this.cartService.getCartSummary().subscribe({
      next: (cartSummary) => {
        console.log(cartSummary);
        this.itemCount = cartSummary.itemCount ?? 0
        this.totalPrice = cartSummary.totalCost ?? 0
      },
      error: () => {
        console.log('Error loading cart summary');
      }
    });
  }

  executeSearch() {
    this.router.navigate(['/products'], {queryParams: {search: this.searchTerm}});
  }

  ngOnInit() {
    this.loadCartSummary();

    this.sharedService.cartUpdate$.subscribe((price) => {
      this.loadCartSummary();
    });
  }
}
