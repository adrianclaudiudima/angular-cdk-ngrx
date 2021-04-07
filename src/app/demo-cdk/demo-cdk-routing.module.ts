import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkHomepageComponent} from './components/cdk-homepage/cdk-homepage.component';

const cdkRoutes: Routes = [
  {
    component: CdkHomepageComponent,
    path: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(cdkRoutes)],
})
export class DemoCdkRoutingModule {

}
