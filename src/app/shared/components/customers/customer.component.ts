import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CustomerState} from '../../../demo-cdk/services/customer/customer-state.model';
import {CustomerStateService} from '../../../demo-cdk/services/customer/customer-state.service';

@Component({
  selector: 'app-customer',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customersState$: Observable<CustomerState>;

  constructor(private customerStateService: CustomerStateService) {
    this.customersState$ = customerStateService.customerState$;
  }

  ngOnInit(): void {
    this.customerStateService.loadCustomers();
  }

  refreshData(): void {
    this.customerStateService.loadCustomers();
  }
}
