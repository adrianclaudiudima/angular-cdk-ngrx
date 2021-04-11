import {Component, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {OrderService} from '../../services/order.service';
import {OrderStateService} from '../../../demo-cdk/services/order/order-state.service';
import {Observable} from 'rxjs';
import {OrderState} from '../../../demo-cdk/services/order/order-state.model';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: OrderService, private orderStateService: OrderStateService) {
    this.orders$ = this.orderStateService.orderState$;
  }

  orders$: Observable<OrderState>;
  private selectedStartDate: Moment;

  ngOnInit(): void {
  }

  handleSortChanged(sort: Sort): void {
    this.orderStateService.sortOrders(sort);
  }

  setStartDate(date: Moment): void {
    this.selectedStartDate = date;
  }

  setEndDate(selectedEndDate: Moment): void {
    if (selectedEndDate) {
      this.orderStateService.filterOrdersByDate(this.selectedStartDate, selectedEndDate);
    }
  }

  refreshData(): void {
    this.orderStateService.loadOrders();
  }
}
