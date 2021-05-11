import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgrxHomepageComponent} from './components/ngx-homepage/ngrx-homepage.component';
import {OrderEditComponent} from '../shared/components/orders/order-edit/order-edit.component';
import {NgrxOrdersComponent} from './components/ngrx-orders/ngrx-orders.component';
import {NgrxCustomersComponent} from './components/ngrx-customers/ngrx-customers.component';
import {NgrxProductsComponent} from './components/ngrx-products/ngrx-products.component';


const routes: Routes = [
  {
    component: NgrxHomepageComponent,
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        component: NgrxOrdersComponent,
        children: [
          {
            path: ':id',
            component: OrderEditComponent,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'customers',
        component: NgrxCustomersComponent
      },
      {
        path: 'products',
        component: NgrxProductsComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoNgrxRoutingModule {

}
