import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {CartControllerService} from "../api/services/cart-controller.service";
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from "../confirmation-dialog/confirmation-dialog.component";
import {CartItemDetails} from "../models/cart-item-details.model";
import {ProductControllerService} from "../api/services/product-controller.service";
import {GetProductDetails$Params} from "../api/fn/product-controller/get-product-details";
import {catchError, map} from "rxjs/operators";
import {forkJoin, Observable, of} from "rxjs";
import {CartItem} from "../api/models/cart-item";
import {CartItemRequest} from "../api/models/cart-item-request";
import {UpdateCartItem$Params} from "../api/fn/cart-controller/update-cart-item";
import {RemoveCartItem$Params} from "../api/fn/cart-controller/remove-cart-item";
import {SharedService} from "../shared/shared.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalItemCount: number = 0
  totalPrice: number = 0
  cartItems: Array<CartItemDetails> = [];
  displayedColumns: string[] = ['name', 'quantity', 'changeQuantity', 'remove'];

  constructor(
    private cartService: CartControllerService,
    private productService: ProductControllerService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loadCartItems();
    this.loadCartSummary();
  }

  getProductNameById(productId: number | undefined): Observable<string> {
    if (productId === undefined) {
      return of("");
    }

    const params: GetProductDetails$Params = {id: productId};
    return this.productService.getProductDetails(params).pipe(
      map(product => product.name ?? ""),
      catchError(error => {
        this.showSnackBar('Error loading product name');
        return of("");
      })
    );
  }

  loadCartItems(): void {
    this.cartService.getCurrentCart().subscribe({
      next: (cart) => {
        console.log(cart);
        if (cart.items !== undefined) {
          const itemsWithNames$ = cart.items.map(item =>
            this.getProductNameById(item.productId).pipe(
              map(name => ({...item, name}))
            )
          );

          forkJoin(itemsWithNames$).subscribe(itemsWithNames => {
            this.cartItems = itemsWithNames;
          });
        }
      },
      error: () => {
        this.showSnackBar('Error loading cart items');
      }
    });
  }

  loadCartSummary(): void {
    this.cartService.getCartSummary().subscribe({
      next: (cartSummary) => {
        console.log(cartSummary);
        this.totalItemCount = cartSummary.itemCount ?? 0
        this.totalPrice = cartSummary.totalCost ?? 0
        this.sharedService.notifyCartUpdate();
      },
      error: () => {
        this.showSnackBar('Error loading cart summary');
      }
    });
  }

  changeQuantity(item: CartItem): void {
    if (item.quantity! < 0) {
      return;
    }

    const cartItemRequest: CartItemRequest = {
      productId: item.productId,
      quantity: item.quantity
    };

    const params: UpdateCartItem$Params = {
      itemId: item.id!,
      body: cartItemRequest
    }
    this.cartService.updateCartItem(params).subscribe({
      next: () => {
        this.loadCartSummary()
      },
      error: () => {
      }
    });
  }

  removeItem(itemId: number): void {
    this.openRemoveConfirmDialog(itemId);
  }

  openRemoveConfirmDialog(itemId: number): void {
    const dialogData: ConfirmationDialogData = {
      title: 'Confirm Action',
      message: 'Are you sure you want to perform this action?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const params: RemoveCartItem$Params = {
        itemId: itemId
      }

      this.cartService.removeCartItem(params).subscribe({
        next: () => {
          this.showSnackBar('Item removed');
          this.loadCartItems();
          this.loadCartSummary();
        },
        error: () => {
          this.showSnackBar('Error removing item');
        }
      });

    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
