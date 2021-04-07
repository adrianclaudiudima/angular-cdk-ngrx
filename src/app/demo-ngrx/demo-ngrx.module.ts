import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {NgrxHomepageComponent} from './components/ngx-homepage/ngrx-homepage.component';
import {DemoNgrxRoutingModule} from './demo-ngrx-routing.module';

@NgModule({
  declarations: [
    NgrxHomepageComponent
  ],
  imports: [
    SharedModule,
    DemoNgrxRoutingModule
  ],
  exports: []
})
export class DemoNgrxModule {

}
