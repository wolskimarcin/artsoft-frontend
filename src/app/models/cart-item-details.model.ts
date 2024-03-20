import {CartItem} from "../api/models/cart-item";

export interface CartItemDetails extends CartItem {
  name?: string;
}
