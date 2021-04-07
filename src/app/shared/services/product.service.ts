import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProductService {

  private productUrl = environment.apiRoot + environment.productRelativeUrl;

  constructor(httpClient: HttpClient) {
  }

}
