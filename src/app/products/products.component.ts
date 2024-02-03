import {Component, OnInit} from '@angular/core';
import {ProductControllerService} from "../api/services/product-controller.service";
import {Product} from "../api/models/product";
import {GetProducts$Params} from "../api/fn/product-controller/get-products";
import {PageProduct} from "../api/models/page-product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(
    private productService: ProductControllerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const search = params['search'] || '';
      const page = parseInt(params['page'] || '0', 10);
      const size = parseInt(params['size'] || '10', 10);

      this.fetchProducts(page, size, search);
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
        this.products = pageData.content || [];
        this.currentPage = pageData.number || 0;
        this.pageSize = pageData.size || 10;
        this.totalElements = pageData.totalElements || 0;
        this.totalPages = pageData.totalPages || 0;
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
}
