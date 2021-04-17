import {Component, OnInit} from '@angular/core';
import {RightMenuAbstractComponent} from '../model/right-menu-abstract.component';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../../../model/product.model';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-product-edit-overlay',
  templateUrl: 'product-edit-overlay.component.html',
  styleUrls: ['product-edit-overlay.component.scss']
})
export class ProductEditOverlayComponent extends RightMenuAbstractComponent implements OnInit {

  product$: Observable<Product>;

  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.product$ = this.httpClient.get<Product>(`http://localhost:4200/api/product/${this.data.productId}`);
  }


  updateProduct(productForm: NgForm): void {
    this.disposeComponentEvent.emit(true);
  }

}
