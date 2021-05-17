import {ordersReducer, OrdersReduxState} from './orders/orders.reducer';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {customersReducer, CustomersReduxState} from './customers/customers.reducer';
import {productsReducer, ProductsReduxState} from './products/products.reducer';

export class DemoNgRxState {
  orders: OrdersReduxState;
  products: ProductsReduxState;
  customers: CustomersReduxState;
}

export const demoNgrxActionReducerMap: ActionReducerMap<DemoNgRxState> = {
  customers: customersReducer,
  products: productsReducer,
  orders: ordersReducer
};

export const demoNgrxReduxKey = 'demo-ngrx';
export const demoNgRxFeatureSelector = createFeatureSelector<DemoNgRxState>(demoNgrxReduxKey);



