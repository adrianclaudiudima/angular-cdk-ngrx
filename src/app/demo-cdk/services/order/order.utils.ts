import {Order, OrderStatus} from '../../../shared/model/order.model';
import {Moment} from 'moment';
import {Label} from 'ng2-charts';


export function extractMinAndMaxDates(orders: Array<Order>): SelectedDateInterval {
  let minDate: Moment;
  let maxDate: Moment;
  orders.forEach((order, index) => {
    if (index === 0) {
      minDate = order.orderDate;
      maxDate = order.orderDate;
    } else {
      if (order.orderDate.isBefore(minDate)) {
        minDate = order.orderDate;
      } else if (order.orderDate.isAfter(maxDate)) {
        maxDate = order.orderDate;
      }
    }
  });
  return {
    maxDate, minDate
  };
}


export function convertOrdersToTotalCount(ordersOfOrders: Array<Array<Order>>, orderStatus: OrderStatus): Array<number> {
  return ordersOfOrders
    .map(or => {
      const filteredOrders: Array<Order> = or.filter(order => order.orderStatus === orderStatus);
      return filteredOrders.length === 0 ? 0 : filteredOrders.map(order => order.total).reduce((a, b) => a + b);
    });
}

export function assignOrdersToMonth(selectedDateInterval: SelectedDateInterval, orders: Array<Order>): OrdersPerMonth {
  let minDate: Moment = selectedDateInterval.minDate.clone();
  const maxDate: Moment = selectedDateInterval.maxDate;
  const labels: Array<string> = [];
  const data: Array<Array<Order>> = [];
  while (minDate.isBefore(maxDate)) {
    data.push(orders.filter(order => order.orderDate.isSameOrAfter(minDate.startOf('month')) && order.orderDate.isSameOrBefore(minDate.endOf('month'))));
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

export interface OrdersPerMonth {
  labels: Label[];
  data: Array<Array<Order>>;
}

export interface SelectedDateInterval {
  minDate: Moment;
  maxDate: Moment;
}
