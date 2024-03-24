import {Component, OnInit} from '@angular/core';
import {ProductControllerService} from "../api/services/product-controller.service";
import {ProductDetails} from "../models/product-details.model";
import {GetProducts$Params} from "../api/fn/product-controller/get-products";
import {PageProduct} from "../api/models/page-product";
import {ActivatedRoute, Router} from "@angular/router";
import {GetProductInventory$Params} from "../api/fn/product-controller/get-product-inventory";
import {CartControllerService} from "../api/services/cart-controller.service";
import {AddProductToCart$Params} from "../api/fn/cart-controller/add-product-to-cart";
import {CartItemRequest} from "../api/models/cart-item-request";
import {SharedService} from "../shared/shared.service";
import {MediaService} from "../media.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductDetails[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;
  private imageQuality: string = '10';

  constructor(
    private productService: ProductControllerService,
    private sharedService: SharedService,
    private cartService: CartControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private mediaService: MediaService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const search = params['search'] || '';
      const page = parseInt(params['page'] || '0', 10);
      const size = parseInt(params['size'] || '10', 10);

      this.fetchProducts(page, size, search);
    });
  }

  addToCart(product: ProductDetails): void {
    const cartItemRequest: CartItemRequest = {
      productId: product.id,
      quantity: 1
    };

    const params: AddProductToCart$Params = {
      body: cartItemRequest
    }
    this.cartService.addProductToCart(params).subscribe({
      next: (response) => {
        this.sharedService.notifyCartUpdate();
        console.log('Product added to cart:', response);
      },
      error: (error) => {
        console.log('Failed to add product to cart:', error);
      }
    });
  }

  fetchProducts(page: number, size: number, search: string = ''): void {
    const params: GetProducts$Params = {
      page: page,
      size: size,
      searchTerm: search
    };

    this.productService.getProducts(params).subscribe({
      next: (pageData: PageProduct) => {
        if (pageData.content == null) return
        this.products = pageData.content.map(product => ({...product, inventoryQuantity: undefined}));
        this.currentPage = pageData.number || 0;
        this.pageSize = pageData.size || 10;
        this.totalElements = pageData.totalElements || 0;
        this.totalPages = pageData.totalPages || 0;

        this.products.forEach((product, index) => {
          this.productService.getProductInventory(<GetProductInventory$Params>{id: product.id}).subscribe({
            next: (inventory) => {
              this.products[index].inventoryQuantity = inventory.quantity;
              this.mediaService.searchImage(product.name!).subscribe(url => {
                this.products[index].imageUrl = `${url}?q=${this.imageQuality}`;
              });
            },
            error: (error) => {
              console.error(`Error fetching inventory for product ${product.id}:`, error);
              this.products[index].inventoryQuantity = 0;
            }
          });
        });
      },
      error: (error) => console.error('Error fetching products:', error)
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.fetchProducts(this.currentPage, this.pageSize);
    }
  }

  navigateToProductPage(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

}
