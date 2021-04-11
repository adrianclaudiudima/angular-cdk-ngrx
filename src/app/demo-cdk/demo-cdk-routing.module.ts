import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkHomepageComponent} from './components/cdk-homepage/cdk-homepage.component';
import {OrdersComponent} from '../shared/components/orders/orders.component';
import {ProductsComponent} from '../shared/components/products/products.component';
import {CustomerComponent} from '../shared/components/customers/customer.component';

const cdkRoutes: Routes = [
  {
    component: CdkHomepageComponent,
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'customers',
        component: CustomerComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(cdkRoutes)],
  exports: [RouterModule]
})
export class DemoCdkRoutingModule {

}
