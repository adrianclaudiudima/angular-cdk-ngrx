import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ChartState} from '../../../demo-cdk/services/order/order-state.model';
import {Status} from '../../../shared/model/domain.model';
import {select, Store} from '@ngrx/store';
import {DemoNgRxState} from '../../store';
import {loadOrdersAction} from '../../store/orders/orders.actions';
import {OrdersReduxState} from '../../store/orders/orders.reducer';
import {getOrdersPerMonthByOrderStatus, getOrdersState, getTotalCustomers, getTotalProductsRejected, getTotalProductsSold, getTotalSoldVsTotalRejected} from '../../store/orders/orders.selectors';
import {OrderStatus} from '../../../shared/model/order.model';
import {OrderService} from '../../../shared/services/order.service';

@Component({
  selector: 'app-ngrx-homepage',
  templateUrl: 'ngrx-homepage.component.html',
  styleUrls: ['ngrx-homepage.component.scss']
})
export class NgrxHomepageComponent implements OnInit {

  orderState$: Observable<OrdersReduxState>;
  approvedOrdersChart$: Observable<ChartState>;
  rejectedOrdersChart$: Observable<ChartState>;
  totalCustomers$: Observable<number>;
  totalSells$: Observable<number>;
  rejectedSells$: Observable<number>;
  soldVsRejected$: Observable<number>;

  STATUS = Status;

  constructor(private store: Store<DemoNgRxState>, private orderService: OrderService) {
    this.orderState$ = this.store.pipe(select(getOrdersState));
    this.totalSells$ = this.store.pipe(select(getTotalProductsSold));
    this.rejectedSells$ = this.store.pipe(select(getTotalProductsRejected));
    this.totalCustomers$ = this.store.pipe(select(getTotalCustomers));
    this.soldVsRejected$ = this.store.pipe(select(getTotalSoldVsTotalRejected));
    this.approvedOrdersChart$ = this.store.pipe(select(getOrdersPerMonthByOrderStatus, OrderStatus.APPROVED));
    this.rejectedOrdersChart$ = this.store.pipe(select(getOrdersPerMonthByOrderStatus, OrderStatus.REJECTED));
  }

  ngOnInit(): void {
    this.store.dispatch(loadOrdersAction());
  }

  loadOrders(): void {
    this.store.dispatch(loadOrdersAction());

  }
}
