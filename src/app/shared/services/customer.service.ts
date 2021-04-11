import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer.model';

@Injectable()
export class CustomerService {

  private customersUrl = environment.apiRoot + environment.userRelativeUrl;

  constructor(private httpClient: HttpClient) {
  }

  public loadCustomers(): Observable<Array<Customer>> {
    return this.httpClient.get<Array<Customer>>(this.customersUrl);
  }


}
