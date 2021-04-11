import {Component, OnInit} from '@angular/core';
import {ProductStateService} from '../../../demo-cdk/services/products/product-state.service';
import {ProductState} from '../../../demo-cdk/services/products/product-state.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: 'products.component.html',
  styleUrls: ['products.component.scss']
})
export class ProductsComponent implements OnInit {

  productState$: Observable<ProductState>;

  constructor(private productStateService: ProductStateService) {
    this.productState$ = productStateService.productState$;
  }

  ngOnInit(): void {
    this.productStateService.loadProducts();
  }

  refreshProducts(): void {
    this.productStateService.loadProducts();
  }
}
