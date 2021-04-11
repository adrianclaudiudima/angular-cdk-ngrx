import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CdkHomepageComponent} from './components/cdk-homepage/cdk-homepage.component';
import {DemoCdkRoutingModule} from './demo-cdk-routing.module';
import {CoreModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {OrderStateService} from './services/order/order-state.service';
import {ProductStateService} from './services/products/product-state.service';
import {CustomerStateService} from './services/customer/customer-state.service';


@NgModule({
  declarations: [
    CdkHomepageComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    DemoCdkRoutingModule,
    CommonModule,
  ],
  providers: [OrderStateService, ProductStateService, CustomerStateService]
})
export class DemoCdkModule {

}
