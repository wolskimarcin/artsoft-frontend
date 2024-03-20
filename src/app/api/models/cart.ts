/* tslint:disable */
/* eslint-disable */
import { CartItem } from '../models/cart-item';
import { LocalUser } from '../models/local-user';
export interface Cart {
  id?: number;
  items?: Array<CartItem>;
  user?: LocalUser;
}
