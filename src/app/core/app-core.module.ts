import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './component/header/header.component';
import {CommonModule} from '@angular/common';
import {HomepageComponent} from './component/homepage/homepage.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ],
  exports: [
    HeaderComponent,
    HomepageComponent
  ]
})
export class AppCoreModule {

}
