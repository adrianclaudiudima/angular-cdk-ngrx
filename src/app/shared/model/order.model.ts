import {Moment} from 'moment';

export interface Order {
  id: number;
  orderId: number;
  customerId: number;
  orderData: Array<OrderItem>;
  orderDate: Moment;
  orderStatus: OrderStatus;
  // because we used random generated data, we could not extract this with the sum of orderItems value
  total?: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export enum OrderStatus {
  APPROVED = 'APPROVED',
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}
