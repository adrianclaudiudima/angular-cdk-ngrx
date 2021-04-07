import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class CustomerService {

  private userUrl = environment.apiRoot + environment.userRelativeUrl;

  constructor(private httpClient: HttpClient) {
  }

}
