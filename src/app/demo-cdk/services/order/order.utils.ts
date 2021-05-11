import {Order, OrderStatus} from '../../../shared/model/order.model';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Label} from 'ng2-charts';
import {Sort} from '@angular/material/sort';


export function extractMinAndMaxDates(orders: Array<Order>): SelectedDateInterval {
  let minDate: Moment;
  let maxDate: Moment;
  orders.forEach((order, index) => {
    if (index === 0) {
      minDate = moment.unix(order.orderDate);
      maxDate = moment.unix(order.orderDate);
    } else {
      if (moment.unix(order.orderDate).isBefore(minDate)) {
        minDate = moment.unix(order.orderDate);
      } else if (moment.unix(order.orderDate).isAfter(maxDate)) {
        maxDate = moment.unix(order.orderDate);
      }
    }
  });
  return {
    maxDate: maxDate.unix(),
    minDate: minDate.unix()
  };
}


export function sortOrders(orders: Array<Order>, sort: Sort): Array<Order> {
  return orders.slice()
    .sort((a, b) => sort.direction === 'asc' ? (moment(a.orderDate).isSameOrBefore(moment(b.orderDate)) ? -1 : 1) : (moment.unix(a.orderDate).isSameOrAfter(moment.unix(b.orderDate)) ? -1 : 1));
}


export function convertOrdersToTotalCount(ordersOfOrders: Array<Array<Order>>, orderStatus: OrderStatus): Array<number> {
  return ordersOfOrders
    .map(or => {
      const filteredOrders: Array<Order> = or.filter(order => order.orderStatus === orderStatus);
      return filteredOrders.length === 0 ? 0 : filteredOrders.map(order => order.total).reduce((a, b) => a + b);
    });
}

export function assignOrdersToMonth(selectedDateInterval: SelectedDateInterval, orders: Array<Order>): OrdersPerMonth {
  let minDate: Moment = moment.unix(selectedDateInterval.minDate);
  const maxDate: Moment = moment.unix(selectedDateInterval.maxDate);
  const labels: Array<string> = [];
  const data: Array<Array<Order>> = [];
  while (minDate.isBefore(maxDate)) {
    data.push(orders.filter(order => moment.unix(order.orderDate).isSameOrAfter(minDate.startOf('month')) && moment.unix(order.orderDate).isSameOrBefore(minDate.endOf('month'))));
    labels.push(minDate.format('MM-YYYY'));
    minDate = minDate.add(1, 'month');
  }
  return {
    labels,
    data
  };
}


export function getTotalOrdersWithCompletedAndApprovedStatus(orders: Array<Order>): number {
  const approvedAndCompletedOrders: Array<Order> = orders.filter(({orderStatus}) => orderStatus === OrderStatus.COMPLETED || orderStatus === OrderStatus.APPROVED);
  return approvedAndCompletedOrders.length === 0 ? 0 : approvedAndCompletedOrders.map(order => order.orderData.length === 0 ? 0 : order.orderData.map(od => od.quantity).reduce((a, b) => a + b))
    .reduce((a, b) => a + b);
}

export function getTotalOrdersRejected(orders: Array<Order>): number {
  const approvedAndCompletedOrders: Array<Order> = orders.filter(({orderStatus}) => orderStatus === OrderStatus.REJECTED);
  return approvedAndCompletedOrders.length === 0 ? 0 : approvedAndCompletedOrders.map(order => order.orderData.length === 0 ? 0 : order.orderData.map(od => od.quantity).reduce((a, b) => a + b))
    .reduce((a, b) => a + b);
}

export function filterOrders(orders: Array<Order>, range: { dateFrom: number, dateTo: number }): Array<Order> {
  return orders.filter(order => moment.unix(order.orderDate).isSameOrAfter(moment.unix(range.dateFrom)) && moment.unix(order.orderDate).isSameOrBefore(moment.unix(range.dateTo)));
}

export interface OrdersPerMonth {
  labels: Label[];
  data: Array<Array<Order>>;
}

export interface SelectedDateInterval {
  minDate: number;
  maxDate: number;
}
