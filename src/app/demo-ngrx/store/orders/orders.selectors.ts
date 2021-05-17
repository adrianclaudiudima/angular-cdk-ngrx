import {createSelector} from '@ngrx/store';
import {demoNgRxFeatureSelector, DemoNgRxState} from '../index';
import {
  assignOrdersToMonth,
  calculateSoldVsRejected,
  calculateTotalCustomers,
  convertOrdersToTotalCount,
  filterOrders,
  getTotalOrdersByOrderStatus,
  getTotalOrdersRejected,
  getTotalOrdersWithCompletedAndApprovedStatus,
  OrdersPerMonth,
  sortOrders
} from '../../../demo-cdk/services/order/order.utils';
import {DateFilter, OrdersReduxState} from './orders.reducer';
import {Order, OrderStatus} from '../../../shared/model/order.model';
import {ChartState} from '../../../demo-cdk/services/order/order-state.model';
import {Sort} from '@angular/material/sort';

export const getOrdersState = createSelector<DemoNgRxState, DemoNgRxState, OrdersReduxState>(demoNgRxFeatureSelector, demoNgRxState => demoNgRxState.orders);
export const getArrayOfOrders = createSelector<DemoNgRxState, OrdersReduxState, Array<Order>>(getOrdersState, orderState => orderState.domain);
export const getDateFilter = createSelector<DemoNgRxState, OrdersReduxState, DateFilter>(getOrdersState, orderState => orderState.dateFilter);
export const getSort = createSelector<DemoNgRxState, OrdersReduxState, Sort>(getOrdersState, orderState => orderState.sort);

export const getArrayOfOrdersSortedAndFiltered = createSelector([getArrayOfOrders, getDateFilter, getSort], (orders, dateFilter, sort) => {
  let filteredOrders = filterOrders(orders, {dateTo: dateFilter.selectedMaxDate, dateFrom: dateFilter.selectedMinDate});
  if (sort.active && sort.active === 'orderDate' && sort.direction !== '') {
    filteredOrders = sortOrders(filteredOrders, sort);
  }
  return filteredOrders;
});
export const getTotalProductsSold = createSelector<DemoNgRxState, Order[], number>(getArrayOfOrdersSortedAndFiltered, orders => getTotalOrdersWithCompletedAndApprovedStatus(orders));
export const getTotalProductsRejected = createSelector<DemoNgRxState, Order[], number>(getArrayOfOrdersSortedAndFiltered, orders => getTotalOrdersRejected(orders));
export const getTotalSoldVsTotalRejected = createSelector<DemoNgRxState, number, number, number>([getTotalProductsSold, getTotalProductsRejected], ((sold, rejected) => calculateSoldVsRejected(sold, rejected)));
export const getTotalProductsByStatus = createSelector<DemoNgRxState, OrderStatus, Order[], number>(getArrayOfOrdersSortedAndFiltered, (orders, orderStatus) => getTotalOrdersByOrderStatus(orders, orderStatus));
export const getOrdersPerMonth = createSelector<DemoNgRxState, Order[], DateFilter, OrdersPerMonth>([getArrayOfOrdersSortedAndFiltered, getDateFilter], (orders, dateFilter) => {
  return assignOrdersToMonth({minDate: dateFilter.selectedMinDate, maxDate: dateFilter.selectedMaxDate},
    filterOrders(orders, {dateTo: dateFilter.selectedMaxDate, dateFrom: dateFilter.selectedMinDate}));
});

export const getOrdersPerMonthByOrderStatus = createSelector<DemoNgRxState, OrderStatus, OrdersPerMonth, ChartState>(getOrdersPerMonth, (orderPerMonth, orderStatus) => {
  return {
    label: orderPerMonth.labels,
    data: [{data: convertOrdersToTotalCount(orderPerMonth.data, orderStatus), label: orderStatus === OrderStatus.APPROVED ? 'Orders approved' : 'Orders rejected'}]
  };
});


export const getTotalCustomers = createSelector(getArrayOfOrdersSortedAndFiltered, orders => calculateTotalCustomers(orders));



