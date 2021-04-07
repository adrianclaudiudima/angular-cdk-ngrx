import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Order} from '../../model/order.model';
import {MatPaginator} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {Moment} from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.scss'],
})
export class OrdersComponent implements OnChanges, AfterViewInit {
  displayedColumns: string[] = ['id', 'orderId', 'orderDate', 'orderStatus', 'totalProducts', 'actions'];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);

  @Input()
  minDate;
  @Input()
  maxDate;

  private startDate: Moment;

  @Input()
  orders: Array<Order> = [];

  @Output()
  sortChanged: EventEmitter<Sort> = new EventEmitter<Sort>();

  @Output()
  filterByDate: EventEmitter<{ dateFrom: Moment, dateTo: Moment }> = new EventEmitter<{ dateFrom: Moment; dateTo: Moment }>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.orders.currentValue) {
      this.dataSource = new MatTableDataSource<Order>(changes.orders.currentValue);
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  setStartDate(date: Moment): void {
    this.startDate = date;
  }

  setEndDate(date: Moment): void {
    if (date) {
      this.filterByDate.emit({dateFrom: this.startDate, dateTo: date});
    }
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMMM YYYY', // this is the format showing on the input element
    monthYearLabel: 'MMMM YYYY', // this is showing on the calendar
  },
};
