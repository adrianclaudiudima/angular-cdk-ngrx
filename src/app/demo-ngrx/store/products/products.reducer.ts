import {DomainEntity, Status} from '../../../shared/model/domain.model';
import {Product} from '../../../shared/model/product.model';
import {createReducer} from '@ngrx/store';

export interface ProductsReduxState extends DomainEntity<Array<Product>> {

}

const productsReduxInitialState: ProductsReduxState = {
  domain: [],
  requestStatus: {
    status: Status.NEW
  }
};

export const productsReducer = createReducer<ProductsReduxState>(productsReduxInitialState);
