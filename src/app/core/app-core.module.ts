import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './component/header/header.component';
import {CommonModule} from '@angular/common';
import {HomepageComponent} from './component/homepage/homepage.component';
import {AppRoutingModule} from '../app-routing.module';
import {ThemeService} from './services/theme.service';


@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    HomepageComponent,
  ], providers: [
    ThemeService
  ]
})
export class AppCoreModule {

}
