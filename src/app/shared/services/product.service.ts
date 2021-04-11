import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';

@Injectable()
export class ProductService {

  private productUrl = environment.apiRoot + environment.productRelativeUrl;

  constructor(private httpClient: HttpClient) {
  }


  public loadProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(this.productUrl);
  }

}
