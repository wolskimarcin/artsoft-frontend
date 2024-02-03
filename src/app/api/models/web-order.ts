/* tslint:disable */
/* eslint-disable */
import { Address } from '../models/address';
import { LocalUser } from '../models/local-user';
import { WebOrderQuantities } from '../models/web-order-quantities';
export interface WebOrder {
  address?: Address;
  id?: number;
  quantities?: Array<WebOrderQuantities>;
  user?: LocalUser;
}
