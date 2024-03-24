import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductControllerService} from "../api/services/product-controller.service";
import {Product} from "../api/models/product";
import {ProductDetails} from "../models/product-details.model";
import {ImageSize, MediaService} from "../media.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  productId: string | null = null;
  product: ProductDetails | undefined;
  mainImageUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductControllerService,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.mainImageUrl = this.product?.imageUrl || 'assets/no-image-available.svg';
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
    if (!this.product.imageUrl) {
      this.mediaService.searchImage(product.name!, ImageSize.Regular).subscribe(url => {
        this.product!.imageUrl = url;
        this.mainImageUrl = url;
      });
    }

    if (!this.product.additionalImages || this.product.additionalImages.length === 0) {
      this.mediaService.searchImages(this.product.name!, ImageSize.Regular, 6).subscribe(urls => {
        this.product!.additionalImages = urls;
      }, error => {
        console.error('Failed to fetch additional images:', error);
      });
    }

    console.log('Product loaded:', product);
  }

  private handleProductError(error: any): void {
    console.error('Error fetching product:', error);
  }

}
