import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {OrderService} from './services/order.service';
import {CustomerService} from './services/customer.service';
import {CardWidgetComponent} from './components/card-widget/card-widget.component';
import {CardWidgetIconDirective} from './components/card-widget/card-widget.directive';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts';
import {BarChartComponent} from './components/bar-chart/bar-chart.component';
import {OrdersComponent} from './components/orders/orders.component';
import {MatSortModule} from '@angular/material/sort';

const materialDependencies = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatMomentDateModule,
  MatToolbarModule,
  MatSortModule,
  MatAutocompleteModule,
  OverlayModule,
];

@NgModule({
  declarations: [
    CardWidgetComponent,
    BarChartComponent,
    OrdersComponent,
    CardWidgetIconDirective
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ChartsModule,
    materialDependencies
  ],
  exports: [
    FlexLayoutModule,
    ChartsModule,
    HttpClientModule,
    materialDependencies,
    CardWidgetComponent,
    CardWidgetIconDirective,
    BarChartComponent,
    OrdersComponent
  ],
  providers: [
    ProductService,
    OrderService,
    CustomerService
  ]
})
export class SharedModule {

}
