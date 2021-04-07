import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './core/component/homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full'
  },
  {
    path: 'cdk',
    loadChildren: () => import('./demo-cdk/demo-cdk.module').then(loadedModule => loadedModule.DemoCdkModule)
  },
  {
    path: 'ngrx',
    loadChildren: () => import('./demo-ngrx/demo-ngrx.module').then(loadedModule => loadedModule.DemoNgrxModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
