import {Component, OnInit} from '@angular/core';
import {Product, ProductControllerService} from '../api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductControllerService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    let productsObservable = this.productService.getProducts();

    productsObservable.subscribe({
      next: (data) => {
        console.log('Received product data:', data); // TODO: Remove logs
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        if (error.status) {
          console.error('HTTP status code:', error.status);
        }
        // TODO: log more details about the error, handle it by displaying an error message
      },
      complete: () => {
        console.log('Product fetching process completed.');
      }
    });
  }

}
