import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Order} from '../../../model/order.model';
import {Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {OverlayGlobalService} from '../../../lib/overlay/global/overlay-global.service';
import {OrderEditOverlayComponent} from '../../../lib/overlay/global/order-edit-overlay/order-edit-overlay.component';

@Component({
  selector: 'app-order-table',
  templateUrl: 'order-table.component.html',
  styleUrls: ['order-table.component.scss']
})
export class OrderTableComponent implements OnChanges, AfterViewInit {

  displayedColumns: string[] = ['id', 'orderId', 'orderDate', 'orderStatus', 'totalProducts', 'actions'];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);
  @Input()
  orders: Array<Order> = [];
  @Output()
  sortChanged: EventEmitter<Sort> = new EventEmitter<Sort>();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private globalOverlay: OverlayGlobalService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.orders.currentValue) {
      this.dataSource = new MatTableDataSource<Order>(changes.orders.currentValue);
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openOrder(orderId: number): void {
    this.globalOverlay.openGlobalOverlay<OrderEditOverlayComponent>(OrderEditOverlayComponent, {orderId});
  }
}
