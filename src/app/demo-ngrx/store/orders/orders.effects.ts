import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadOrdersAction, loadOrdersFailedAction, loadOrdersSuccessAction} from './orders.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {OrderService} from '../../../shared/services/order.service';
import {of} from 'rxjs';

@Injectable()
export class OrdersEffects {

  constructor(private actions$: Actions, private ordersService: OrderService) {
  }

  loadOrders$ = createEffect(() => this.actions$.pipe(
    ofType(loadOrdersAction),
    switchMap(action => this.ordersService.getOrders()
      .pipe(
        map(orders => loadOrdersSuccessAction({orders})),
        catchError(error => of(loadOrdersFailedAction({error: {errorMessage: 'Something went wrong ', errorCode: 400}})))
      ),
    ))
  );

}
