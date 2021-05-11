import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {NgrxHomepageComponent} from './components/ngx-homepage/ngrx-homepage.component';
import {DemoNgrxRoutingModule} from './demo-ngrx-routing.module';
import {NgrxOrdersComponent} from './components/ngrx-orders/ngrx-orders.component';
import {NgrxCustomersComponent} from './components/ngrx-customers/ngrx-customers.component';
import {NgrxProductsComponent} from './components/ngrx-products/ngrx-products.component';

@NgModule({
  declarations: [
    NgrxHomepageComponent,
    NgrxOrdersComponent,
    NgrxCustomersComponent,
    NgrxProductsComponent
  ],
  imports: [
    SharedModule,
    DemoNgrxRoutingModule,
  ],
  exports: [],
})
export class DemoNgrxModule {

}
