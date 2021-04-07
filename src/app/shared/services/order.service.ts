import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Order} from '../model/order.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class OrderService {

  private orderUrl = environment.apiRoot + environment.orderRelativeUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getOrders(): Observable<Array<Order>> {
    return this.httpClient.get<Array<Order>>(this.orderUrl).pipe(
      map<Array<Order>, Array<Order>>((orders, index) => {
        return orders.map(order => {
          return {
            ...order,
            orderDate: moment(order.orderDate, 'DD/MM/YYYY'),
            total: order.orderData?.length > 0 ?
              order.orderData.map(ord => ord.quantity).reduce((previousValue, currentValue) => previousValue + currentValue) : 0
          };
        });
      })
    );
  }

}
