import {DomainEntity} from '../../../shared/model/domain.model';
import {Product} from '../../../shared/model/product.model';

export interface ProductState extends DomainEntity<Array<Product>> {
  filteredProducts: Array<Product>;
}
