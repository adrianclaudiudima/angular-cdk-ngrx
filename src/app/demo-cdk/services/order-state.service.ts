import {Injectable} from '@angular/core';
import {OrderService} from '../../shared/services/order.service';
import {BehaviorSubject, forkJoin, Observable, Subject} from 'rxjs';
import {Status} from '../../shared/model/domain.model';
import {Sort} from '@angular/material/sort';
import {Moment} from 'moment';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {assignOrdersToMonth, convertOrdersToTotalCount, extractMinAndMaxDates, getTotalOrdersRejected, getTotalOrdersWithCompletedAndApprovedStatus, SelectedDateInterval} from './order.utils';
import {ChartState, OrderState} from './order.model';
import {OrderStatus} from '../../shared/model/order.model';
import {ThemeService} from '../../core/services/theme.service';

const initialOrderState: OrderState = {
  domain: [],
  filteredOrders: [],
  requestStatus: {status: Status.NEW},
  dateFilter: undefined
};

@Injectable()
export class OrderStateService {

  private orderState: OrderState;
  private orderStateSubject: Subject<OrderState> = new BehaviorSubject(initialOrderState);
  public orderState$: Observable<OrderState> = this.orderStateSubject.asObservable();

  public totalCustomers$: Observable<number> = this.orderState$.pipe(
    map(orderState => {
      const customerIds: Array<number> = [];
      orderState.filteredOrders.forEach(order => {
        if (!customerIds.find(cId => cId === order.customerId)) {
          customerIds.push(order.customerId);
        }
      });
      return customerIds.length;
    })
  );

  public totalProductsSold$: Observable<number> = this.orderState$.pipe(map(orderState => getTotalOrdersWithCompletedAndApprovedStatus(orderState.filteredOrders)));
  public totalProductsRejected$: Observable<number> = this.orderState$.pipe(map(orderState => getTotalOrdersRejected(orderState.filteredOrders)));
  public soldVsRejected$: Observable<number> = this.orderState$.pipe(
    switchMap(() => forkJoin([this.totalProductsSold$.pipe(take(1)), this.totalProductsRejected$.pipe(take(1))])),
    map(([sold, rejected]) => (100 * (sold - rejected)) / sold));

  private ordersPerMonth$ = this.orderState$.pipe(
    filter(orderState => orderState.dateFilter !== undefined),
    map(orderState => {
      return assignOrdersToMonth({
        minDate: orderState.dateFilter.selectedMinDate,
        maxDate: orderState.dateFilter.selectedMaxDate
      }, orderState.filteredOrders);
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
          filteredOrders: v.slice(),
          requestStatus: {
            status: Status.COMPLETED
          },
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
          filteredOrders: [],
          requestStatus: {
            status: Status.ERROR,
          },
          dateFilter: undefined
        };
        this.orderStateSubject.next(this.orderState);
      });
  }

  public sortOrders(sort: Sort): void {
    if (sort.active && sort.active === 'orderDate') {
      if (sort.direction === '') {
        this.orderState = {
          ...this.orderState,
          filteredOrders: this.orderState.domain
            .filter(order => order.orderDate.isSameOrAfter(this.orderState.dateFilter.selectedMinDate) && order.orderDate.isSameOrBefore(this.orderState.dateFilter.selectedMaxDate))
        };
      } else {
        this.orderState = {
          ...this.orderState,
          filteredOrders: this.orderState.filteredOrders.slice()
            .sort((a, b) => sort.direction === 'asc' ? (a.orderDate.isSameOrBefore(b.orderDate) ? -1 : 1) : (a.orderDate.isSameOrAfter(b.orderDate) ? -1 : 1))
        };
      }
      this.orderStateSubject.next(this.orderState);
    }
  }

  /**
   * Filter orders by date and stores them in state
   * @param dateFrom Orders with date after dateFrom
   * @param dateTo Orders with date before dateTo
   */

  public filterOrdersByDate(dateFrom: Moment, dateTo: Moment): void {
    this.orderState = {
      ...this.orderState,
      dateFilter: {
        ...this.orderState.dateFilter,
        selectedMaxDate: dateTo,
        selectedMinDate: dateFrom
      },
      filteredOrders: this.orderState.domain.filter(order => order.orderDate.isSameOrAfter(dateFrom) && order.orderDate.isSameOrBefore(dateTo))
    };
    this.orderStateSubject.next(this.orderState);
  }
}

