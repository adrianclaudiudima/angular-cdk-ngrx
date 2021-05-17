import {createAction, props} from '@ngrx/store';
import {Order} from '../../../shared/model/order.model';
import {Sort} from '@angular/material/sort';

export const loadOrdersAction = createAction('[ORDERS] Load orders action');
export const loadOrdersSuccessAction = createAction('[ORDERS] Load orders success action', props<{ orders: Array<Order> }>());
export const loadOrdersFailedAction = createAction('[ORDERS] Load orders failed action', props<{ error: { errorMessage: string, errorCode: number } }>());
export const filterOrdersAction = createAction('[ORDERS] Filter orders action', props<{ selectedMinDate: number, selectedMaxDate: number }>());
export const sortOrdersAction = createAction('[ORDERS] Sort orders action', props<{ sort: Sort }>());
