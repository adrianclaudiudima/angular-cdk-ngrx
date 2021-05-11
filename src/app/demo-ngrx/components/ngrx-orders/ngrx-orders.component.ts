import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Moment} from 'moment';
import {Sort} from '@angular/material/sort';
import {OrderState} from '../../../demo-cdk/services/order/order-state.model';

@Component({
  selector: 'app-ngrx-orders',
  templateUrl: 'ngrx-orders.component.html',
  styleUrls: ['ngrx-orders.component.scss']
})
export class NgrxOrdersComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  orders$: Observable<OrderState>;
  private selectedStartDate: Moment;

  handleSortChanged(sort: Sort): void {
    // todo implement it
  }

  setStartDate(date: Moment): void {
    this.selectedStartDate = date;
  }

  setEndDate(selectedEndDate: Moment): void {
    if (selectedEndDate) {
      // todo implement
    }
  }

  refreshData(): void {
    // todo implement
  }

  handleOpenOrderEvent(orderId: number): void {
    this.router.navigate([orderId], {relativeTo: this.activatedRoute});
  }
}
