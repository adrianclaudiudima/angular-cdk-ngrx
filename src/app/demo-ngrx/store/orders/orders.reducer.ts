import {DomainEntity, Status} from '../../../shared/model/domain.model';
import {Order} from '../../../shared/model/order.model';
import {Sort} from '@angular/material/sort';
import {createReducer, on} from '@ngrx/store';
import {filterOrdersAction, loadOrdersAction, loadOrdersFailedAction, loadOrdersSuccessAction, sortOrdersAction} from './orders.actions';
import {extractMinAndMaxDates, SelectedDateInterval} from '../../../demo-cdk/services/order/order.utils';

export interface DateFilter {
  minDate: number;
  selectedMinDate: number;
  maxDate: number;
  selectedMaxDate: number;
}

export interface OrdersReduxState extends DomainEntity<Array<Order>> {
  sort: Sort;
  dateFilter: DateFilter;
}

export const ordersInitialState: OrdersReduxState = {
  sort: {
    active: '',
    direction: ''
  },
  domain: [],
  requestStatus: {
    status: Status.NEW
  },
  dateFilter: {
    minDate: undefined,
    maxDate: undefined,
    selectedMinDate: undefined,
    selectedMaxDate: undefined
  }
};

export const ordersReducer = createReducer<OrdersReduxState>(ordersInitialState,
  on(loadOrdersAction, (state) => {
    return {
      ...state,
      requestStatus: {
        status: Status.PENDING
      }
    };
  }),
  on(loadOrdersSuccessAction, (state, {orders}) => {
    const minAndMaxDates: SelectedDateInterval = extractMinAndMaxDates(orders);
    return {
      ...state,
      requestStatus: {
        status: Status.COMPLETED,
        error: undefined
      },
      domain: orders,
      dateFilter: {
        minDate: minAndMaxDates.minDate,
        maxDate: minAndMaxDates.maxDate,
        selectedMinDate: minAndMaxDates.minDate,
        selectedMaxDate: minAndMaxDates.maxDate
      }
    };
  }),
  on(loadOrdersFailedAction, (state, {error}) => {
    return {
      ...state,
      requestStatus: {
        status: Status.ERROR,
        error: {
          errorMessage: error.errorMessage,
          code: error.errorCode
        }
      }
    };
  }),
  on(sortOrdersAction, (state, {sort}) => {
    return {
      ...state,
      sort
    };
  }),
  on(filterOrdersAction, (state, {selectedMinDate, selectedMaxDate}) => {
    return {
      ...state,
      dateFilter: {
        ...state.dateFilter,
        selectedMinDate,
        selectedMaxDate
      }
    };
  })
);

