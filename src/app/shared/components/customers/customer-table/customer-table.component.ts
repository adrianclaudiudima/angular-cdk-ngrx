import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Customer} from '../../../model/customer.model';

@Component({
  selector: 'app-customer-table',
  templateUrl: 'customer-table.component.html',
  styleUrls: ['customer-table.component.scss']
})
export class CustomerTableComponent implements AfterViewInit, OnChanges, OnDestroy {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'gender', 'actions'];
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>([]);

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  @Input()
  customers: Array<Customer> = [];

  @Output()
  sortChanged: EventEmitter<Sort> = new EventEmitter<Sort>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.customers.currentValue) {
      this.dataSource = new MatTableDataSource<Customer>(changes.customers.currentValue);
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
  }
}
