import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgrxHomepageComponent} from './components/ngx-homepage/ngrx-homepage.component';


const routes: Routes = [
  {
    path: '',
    component: NgrxHomepageComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class DemoNgrxRoutingModule {

}
