import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../shared/services/order.service';
import {OrderStateService} from '../../services/order/order-state.service';
import {Observable} from 'rxjs';
import {ChartState, OrderState} from '../../services/order/order-state.model';
import {Status} from '../../../shared/model/domain.model';


@Component({
  selector: 'app-cdk-homepage',
  templateUrl: 'cdk-homepage.component.html',
  styleUrls: ['cdk-homepage.component.scss', 'cdk-homepage.theme.scss']
})
export class CdkHomepageComponent implements OnInit {

  constructor(private orderService: OrderService, private orderStateService: OrderStateService) {
    this.orders$ = this.orderStateService.orderState$;
    this.approvedOrdersChart$ = this.orderStateService.totalPriceOfOrdersPerMonthCompleted$;
    this.rejectedOrdersChart$ = this.orderStateService.totalPriceOfOrdersPerMonthRejected$;
    this.totalCustomers$ = this.orderStateService.totalCustomers$;
    this.totalSells$ = this.orderStateService.totalProductsSold$;
    this.rejectedSells$ = this.orderStateService.totalProductsRejected$;
    this.soldVsRejected$ = this.orderStateService.soldVsRejected$;
  }

  orders$: Observable<OrderState>;
  approvedOrdersChart$: Observable<ChartState>;
  rejectedOrdersChart$: Observable<ChartState>;
  totalCustomers$: Observable<number>;
  totalSells$: Observable<number>;
  rejectedSells$: Observable<number>;
  soldVsRejected$: Observable<number>;

  STATUS = Status;

  ngOnInit(): void {
    this.loadOrders();
    this.loadOrders();
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderStateService.loadOrders();
  }

}
