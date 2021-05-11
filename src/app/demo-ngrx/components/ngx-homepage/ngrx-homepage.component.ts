import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ChartState, OrderState} from '../../../demo-cdk/services/order/order-state.model';
import {Status} from '../../../shared/model/domain.model';

@Component({
  selector: 'app-ngrx-homepage',
  templateUrl: 'ngrx-homepage.component.html',
  styleUrls: ['ngrx-homepage.component.scss']
})
export class NgrxHomepageComponent implements OnInit {

  // todo: change it
  orderState$: Observable<OrderState>;
  approvedOrdersChart$: Observable<ChartState>;
  rejectedOrdersChart$: Observable<ChartState>;
  totalCustomers$: Observable<number>;
  totalSells$: Observable<number>;
  rejectedSells$: Observable<number>;
  soldVsRejected$: Observable<number>;

  STATUS = Status;

  constructor() {
    // todo : implement
  }

  ngOnInit(): void {
    // todo implement
  }

  loadOrders(): void {

  }
}
