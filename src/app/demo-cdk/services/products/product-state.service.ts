import {Injectable} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ProductState} from './product-state.model';
import {Status} from '../../../shared/model/domain.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class ProductStateService {

  private productState: ProductState = {domain: [], filteredProducts: [], requestStatus: {status: Status.NEW}};
  private productStateSubject: Subject<ProductState> = new BehaviorSubject(this.productState);
  public productState$: Observable<ProductState> = this.productStateSubject.asObservable();

  constructor(private productService: ProductService) {

  }


  public loadProducts(): void {
    this.productService.loadProducts().subscribe(value => {
      this.productState = {
        domain: value,
        filteredProducts: value,
        requestStatus: {
          status: Status.COMPLETED
        }
      };
      this.productStateSubject.next(this.productState);
    }, error => {
      this.productState = {
        domain: [],
        filteredProducts: [],
        requestStatus: {
          status: Status.ERROR
        }
      };
      this.productStateSubject.next(this.productState);
    });

  }

}
