import {DomainEntity, Status} from '../../../shared/model/domain.model';
import {Customer} from '../../../shared/model/customer.model';
import {Action} from '@ngrx/store';

export interface CustomersReduxState extends DomainEntity<Array<Customer>> {

}

export const customersReduxInitialState: CustomersReduxState = {
  domain: [],
  requestStatus: {
    status: Status.NEW
  }
};
export const customersReducer = (state: CustomersReduxState = customersReduxInitialState, action: Action): CustomersReduxState => {
  return {...state};
};
