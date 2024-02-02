export * from './authenticationController.service';
import { AuthenticationControllerService } from './authenticationController.service';
export * from './orderController.service';
import { OrderControllerService } from './orderController.service';
export * from './productController.service';
import { ProductControllerService } from './productController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [AuthenticationControllerService, OrderControllerService, ProductControllerService, UserControllerService];
