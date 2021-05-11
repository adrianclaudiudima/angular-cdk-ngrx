import {Injectable} from '@angular/core';
import {OrderService} from '../../../shared/services/order.service';
import {BehaviorSubject, forkJoin, Observable, Subject} from 'rxjs';
import {Status} from '../../../shared/model/domain.model';
import {Sort} from '@angular/material/sort';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {assignOrdersToMonth, convertOrdersToTotalCount, extractMinAndMaxDates, filterOrders, getTotalOrdersRejected, getTotalOrdersWithCompletedAndApprovedStatus, SelectedDateInterval, sortOrders} from './order.utils';
import {ChartState, OrderState} from './order-state.model';
import {Order, OrderStatus} from '../../../shared/model/order.model';
import {ThemeService} from '../../../core/services/theme.service';

const initialOrderState: OrderState = {
  domain: [],
  requestStatus: {status: Status.NEW},
  dateFilter: undefined,
  sort: undefined
};

@Injectable()
export class OrderStateService {

  private orderState: OrderState;
  private orderStateSubject: Subject<OrderState> = new BehaviorSubject(initialOrderState);
  public orderState$: Observable<OrderState> = this.orderStateSubject.asObservable();

  public ordersFiltered$: Observable<Array<Order>> = this.orderState$.pipe(
    filter(state => state.domain.length > 0),
    map(orderState => {
      let filteredOrders = filterOrders(orderState.domain, {dateTo: orderState.dateFilter.selectedMaxDate, dateFrom: orderState.dateFilter.selectedMinDate});
      if (orderState.sort.active && orderState.sort.active === 'orderDate' && orderState.sort.direction !== '') {
        filteredOrders = sortOrders(filteredOrders, orderState.sort);
      }
      return filteredOrders;
    })
  );
  public totalCustomers$: Observable<number> = this.ordersFiltered$.pipe(
    map(filteredOrders => {
      const customerIds: Array<number> = [];
      filteredOrders.forEach(order => {
        if (!customerIds.find(cId => cId === order.customerId)) {
          customerIds.push(order.customerId);
        }
      });
      return customerIds.length;
    })
  );

  public totalProductsSold$: Observable<number> = this.ordersFiltered$.pipe(map(filteredOrders => getTotalOrdersWithCompletedAndApprovedStatus(filteredOrders)));
  public totalProductsRejected$: Observable<number> = this.ordersFiltered$.pipe(map(filteredOrders => getTotalOrdersRejected(filteredOrders)));
  public soldVsRejected$: Observable<number> = this.orderState$.pipe(
    switchMap(() => forkJoin([this.totalProductsSold$.pipe(take(1)), this.totalProductsRejected$.pipe(take(1))])),
    map(([sold, rejected]) => (100 * (sold - rejected)) / sold));

  private ordersPerMonth$ = this.orderState$.pipe(
    filter(orderState => orderState.dateFilter !== undefined),
    map(orderState => {
      return assignOrdersToMonth({minDate: orderState.dateFilter.selectedMinDate, maxDate: orderState.dateFilter.selectedMaxDate},
        filterOrders(orderState.domain, {dateTo: orderState.dateFilter.selectedMaxDate, dateFrom: orderState.dateFilter.selectedMinDate}));
    })
  );
  public totalPriceOfOrdersPerMonthRejected$: Observable<ChartState> = this.ordersPerMonth$.pipe(
    map(ordersPerMonth => {
      return {
        label: ordersPerMonth.labels,
        data: [{data: convertOrdersToTotalCount(ordersPerMonth.data, OrderStatus.REJECTED), label: 'Orders rejected'}]
      };
    })
  );

  public totalPriceOfOrdersPerMonthCompleted$: Observable<ChartState> = this.ordersPerMonth$.pipe(
    map(ordersPerMonth => {
      return {
        label: ordersPerMonth.labels,
        data: [{data: convertOrdersToTotalCount(ordersPerMonth.data, OrderStatus.COMPLETED), label: 'Orders completed'}]
      };
    })
  );

  constructor(private orderService: OrderService, private themeService: ThemeService) {
  }

  public loadOrders(): void {
    this.orderService.getOrders()
      .subscribe(v => {
        const minAndMaxDates: SelectedDateInterval = extractMinAndMaxDates(v);
        this.orderState = {
          domain: v.slice(),
          requestStatus: {
            status: Status.COMPLETED
          },
          sort: {direction: '', active: ''},
          dateFilter: {
            maxDate: minAndMaxDates.maxDate,
            minDate: minAndMaxDates.minDate,
            selectedMaxDate: minAndMaxDates.maxDate,
            selectedMinDate: minAndMaxDates.minDate
          }
        };
        this.orderStateSubject.next(this.orderState);
      }, error => {
        this.orderState = {
          domain: [],
          requestStatus: {
            status: Status.ERROR,
          },
          dateFilter: undefined,
          sort: {direction: '', active: ''},
        };
        this.orderStateSubject.next(this.orderState);
      });
  }

  public sortOrders(sort: Sort): void {
    this.orderState = {
      ...this.orderState,
      sort
    };
    this.orderStateSubject.next(this.orderState);
  }

  /**
   * Filter orders by date and stores them in state
   * @param dateFrom Orders with date after dateFrom
   * @param dateTo Orders with date before dateTo
   */

  public filterOrdersByDate(dateFrom: number, dateTo: number): void {
    this.orderState = {
      ...this.orderState,
      dateFilter: {
        ...this.orderState.dateFilter,
        selectedMaxDate: dateTo,
        selectedMinDate: dateFrom
      }
    };
    this.orderStateSubject.next(this.orderState);
  }
}

