import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Sort} from '@angular/material/sort';
import {select, Store} from '@ngrx/store';
import {DemoNgRxState} from '../../store';
import {Order} from '../../../shared/model/order.model';
import {getArrayOfOrdersSortedAndFiltered, getDateFilter} from '../../store/orders/orders.selectors';
import {DateFilter} from '../../store/orders/orders.reducer';
import {tap} from 'rxjs/operators';
import {filterOrdersAction, loadOrdersAction, sortOrdersAction} from '../../store/orders/orders.actions';

@Component({
  selector: 'app-ngrx-orders',
  templateUrl: 'ngrx-orders.component.html',
  styleUrls: ['ngrx-orders.component.scss']
})
export class NgrxOrdersComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<DemoNgRxState>) {
    this.dateFilter$ = this.store.pipe(select(getDateFilter)).pipe(
      tap(dateFilter => {
        this.dateFilterValues = {
          min: moment.unix(dateFilter.minDate),
          max: moment.unix(dateFilter.maxDate),
          maxSelected: moment.unix(dateFilter.selectedMaxDate),
          minSelected: moment.unix(dateFilter.selectedMinDate)
        };
      })
    );
    this.orders$ = this.store.select(getArrayOfOrdersSortedAndFiltered);
  }

  dateFilterValues: { min: Moment, max: Moment, minSelected: Moment, maxSelected: Moment };

  orders$: Observable<Order[]>;
  dateFilter$: Observable<DateFilter>;
  private selectedStartDate: Moment;

  handleSortChanged(sort: Sort): void {
    this.store.dispatch(sortOrdersAction({sort}));
  }

  setStartDate(date: Moment): void {
    console.log(date);
    this.selectedStartDate = date;
  }

  setEndDate(selectedEndDate: Moment): void {
    if (selectedEndDate) {
      this.store.dispatch(filterOrdersAction({
        selectedMinDate: this.selectedStartDate.unix(),
        selectedMaxDate: selectedEndDate.unix()
      }));
    }
  }

  refreshData(): void {
    this.store.dispatch(loadOrdersAction());
  }

  handleOpenOrderEvent(orderId: number): void {
    this.router.navigate([orderId], {relativeTo: this.activatedRoute});
  }
}
