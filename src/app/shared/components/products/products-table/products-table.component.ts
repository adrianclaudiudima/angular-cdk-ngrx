import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Product} from '../../../model/product.model';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {merge, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-product-table',
  templateUrl: 'products-table.component.html',
  styleUrls: ['products-table.component.scss']
})
export class ProductsTableComponent implements OnChanges, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['id', 'productName', 'productDescription', 'price', 'actions'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  isSmall = false;
  responsiveSubscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.responsiveSubscription = merge(
      breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
        filter(v => v.matches),
        map(() => true)
      ),
      breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).pipe(
        filter(v => v.matches),
        map(() => false)
      )
    ).subscribe(isSmall => {
      this.isSmall = isSmall;
      this.displayedColumns = isSmall ? ['id', 'productName', 'actions'] : ['id', 'productName', 'productDescription', 'price', 'actions'];
    });

  }

  @Input()
  products: Array<Product> = [];

  @Output()
  sortChanged: EventEmitter<Sort> = new EventEmitter<Sort>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products.currentValue) {
      this.dataSource = new MatTableDataSource<Product>(changes.products.currentValue);
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.responsiveSubscription.unsubscribe();
  }


}
