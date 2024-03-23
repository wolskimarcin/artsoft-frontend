import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductControllerService} from "../api/services/product-controller.service";
import {Product} from "../api/models/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  productId: string | null = null;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductControllerService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (!this.productId) {
      console.error('Product ID is missing');
      return;
    }

    const params = { id: parseInt(this.productId, 10) };
    this.productService.getProductDetails(params).subscribe({
      next: (product: Product) => this.handleProductSuccess(product),
      error: (error) => this.handleProductError(error)
    });
  }

  private handleProductSuccess(product: Product): void {
    this.product = product;
    console.log('Product loaded:', product);
  }

  private handleProductError(error: any): void {
    console.error('Error fetching product:', error);
  }
}
