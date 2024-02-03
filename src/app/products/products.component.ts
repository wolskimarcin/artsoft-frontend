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
        this.products = data.map(product => ({
          ...product,
          // TODO: TEMPORARY SOLUTION! Integrate with amazon s3 for storing images
          imageUrl: `https://picsum.photos/seed/${this.simpleHash(product.name)}/200/300`
        }));
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

  private simpleHash(input: string | undefined): number {
    if (input == null) return 1;

    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

}
