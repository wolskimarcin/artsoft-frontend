/* tslint:disable */
/* eslint-disable */
import { Inventory } from '../models/inventory';
export interface Product {
  id?: number;
  inventory?: Inventory;
  longDescription?: string;
  name?: string;
  price?: number;
  shortDescription?: string;
}
