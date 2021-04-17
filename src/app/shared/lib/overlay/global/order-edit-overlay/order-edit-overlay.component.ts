import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Order, OrderStatus} from '../../../../model/order.model';
import {RightMenuAbstractComponent} from '../model/right-menu-abstract.component';

@Component({
  selector: 'app-edit-order',
  templateUrl: 'order-edit-overlay.component.html',
  styleUrls: ['order-edit-overlay.component.scss']
})
export class OrderEditOverlayComponent extends RightMenuAbstractComponent implements OnInit {

  order$: Observable<Order>;

  orderStatuses: Array<string> = Object.values(OrderStatus);

  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.order$ = this.httpClient.get<Order>(`http://localhost:4200/api/order/${this.data.orderId}`);
  }


  updateOrder(productForm: NgForm): void {
    console.log(productForm);
  }
}
