import { User } from './user';
import { Product } from './products';

export interface Order {
    quantity: number;
    paymentMethod: string;
    status: string;
    _id: string;
    product: Product;
    price: number;
    user: User;
    firstName: string;
    lastName: string;
    address: string;
    created_at: string;
    updatedAt: string;
    __v: number;
  }