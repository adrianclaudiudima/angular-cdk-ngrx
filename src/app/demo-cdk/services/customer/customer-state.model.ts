import {DomainEntity} from '../../../shared/model/domain.model';
import {Customer} from '../../../shared/model/customer.model';

export interface CustomerState extends DomainEntity<Array<Customer>> {

}
