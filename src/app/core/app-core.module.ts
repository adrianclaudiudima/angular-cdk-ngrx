import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './component/header/header.component';
import {CommonModule} from '@angular/common';
import {HomepageComponent} from './component/homepage/homepage.component';
import {AppRoutingModule} from '../app-routing.module';
import {ThemeService} from './services/theme.service';
import {LoadingScreenComponent} from './component/loading-screen/loading-screen.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoadingInterceptor} from './services/loading-interceptor.service';
import {LoadingStateService} from './services/loading-state.service';


@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent,
    LoadingScreenComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    HeaderComponent,
    HomepageComponent,
  ], providers: [
    ThemeService,
    LoadingStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
})
export class AppCoreModule {

}
