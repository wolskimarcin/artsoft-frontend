import {Product} from "../api/models/product";

export interface ProductDetails extends Product {
  inventoryQuantity?: number;
  imageUrl?: string;
}
