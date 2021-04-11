import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../../model/product.model';
import {productWidgetAnimation} from './product-widget.animation';

@Component({
  selector: 'app-product-widget',
  templateUrl: 'product-widget.component.html',
  styleUrls: ['product-widget.component.scss', 'product-widget.theme.scss'],
  animations: [productWidgetAnimation]
})
export class ProductWidgetComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.product$ = this.httpClient.get<Product>('http://localhost:4200/api/product/1');
  }

}
