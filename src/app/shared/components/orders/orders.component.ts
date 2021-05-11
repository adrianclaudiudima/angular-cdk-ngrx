import {AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {OrderService} from '../../services/order.service';
import {OrderStateService} from '../../../demo-cdk/services/order/order-state.service';
import {Observable} from 'rxjs';
import {OrderState} from '../../../demo-cdk/services/order/order-state.model';
import {Sort} from '@angular/material/sort';
import {CdkPortal, DomPortalOutlet} from '@angular/cdk/portal';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../model/order.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.scss'],
})
export class OrdersComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private orderService: OrderService, private orderStateService: OrderStateService,
              private applicationRef: ApplicationRef, private injector: Injector, private componentFactoryResolver: ComponentFactoryResolver,
              private router: Router, private activatedRoute: ActivatedRoute
  ) {
    this.orders$ = this.orderStateService.orderState$.pipe(
      tap(v => {
        this.maxDate = moment.unix(v.dateFilter?.maxDate);
        this.minDate = moment.unix(v.dateFilter?.minDate);
      })
    );
    this.filteredOrders$ = this.orderStateService.ordersFiltered$;
  }

  maxDate: Moment;
  minDate: Moment;

  @ViewChild(CdkPortal)
  private cdkPortal: CdkPortal;

  private host: DomPortalOutlet;


  orders$: Observable<OrderState>;
  filteredOrders$: Observable<Array<Order>>;
  private selectedStartDate: Moment;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.host = new DomPortalOutlet(document.querySelector('#refreshPlaceholder'), this.componentFactoryResolver, this.applicationRef, this.injector);
    this.host.attachTemplatePortal(this.cdkPortal);
  }


  handleSortChanged(sort: Sort): void {
    this.orderStateService.sortOrders(sort);
  }

  setStartDate(date: Moment): void {
    this.selectedStartDate = date;
  }

  setEndDate(selectedEndDate: Moment): void {
    if (selectedEndDate) {
      this.orderStateService.filterOrdersByDate(this.selectedStartDate.unix(), selectedEndDate.unix());
    }
  }

  refreshData(): void {
    this.orderStateService.loadOrders();
  }

  ngOnDestroy(): void {
    this.host.detach();
  }

  handleOpenOrderEvent(orderId: number): void {
    this.router.navigate([orderId], {relativeTo: this.activatedRoute});
  }
}
