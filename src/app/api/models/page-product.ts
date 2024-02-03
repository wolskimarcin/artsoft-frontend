/* tslint:disable */
/* eslint-disable */
import { PageableObject } from '../models/pageable-object';
import { Product } from '../models/product';
import { SortObject } from '../models/sort-object';
export interface PageProduct {
  content?: Array<Product>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}
