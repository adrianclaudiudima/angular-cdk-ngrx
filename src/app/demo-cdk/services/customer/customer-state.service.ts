import {Injectable} from '@angular/core';
import {CustomerService} from '../../../shared/services/customer.service';
import {CustomerState} from './customer-state.model';
import {BehaviorSubject} from 'rxjs';
import {Status} from '../../../shared/model/domain.model';


const initialCustomerState: CustomerState = {
  domain: [],
  requestStatus: {
    status: Status.NEW
  }
};

@Injectable()
export class CustomerStateService {

  private customerState: CustomerState;
  private customerSubject: BehaviorSubject<CustomerState> = new BehaviorSubject<CustomerState>(initialCustomerState);
  public customerState$ = this.customerSubject.asObservable();

  constructor(private customerService: CustomerService) {
  }

  public loadCustomers(): void {
    this.customerService.loadCustomers().subscribe(
      value => {
        this.customerState = {
          domain: value,
          requestStatus: {
            status: Status.COMPLETED
          }
        };
        this.customerSubject.next(this.customerState);
      },
      error => {
        this.customerState = {
          domain: [],
          requestStatus: {
            status: Status.ERROR,
            error: {
              errorMessage: 'Something went wrong'
            }
          }
        };
        this.customerSubject.next(this.customerState);
      }
    );
  }

}
