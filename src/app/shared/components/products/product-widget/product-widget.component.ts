import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../../model/product.model';
import {productWidgetAnimation} from './product-widget.animation';
import {OverlayRef} from '@angular/cdk/overlay';
import {OVERLAY_CONNECTED_DATA} from '../../../lib/overlay/connected/overlay-connected.model';

@Component({
  selector: 'app-product-widget',
  templateUrl: 'product-widget.component.html',
  styleUrls: ['product-widget.component.scss', 'product-widget.theme.scss'],
  animations: [productWidgetAnimation]
})
export class ProductWidgetComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private httpClient: HttpClient, private overlayRef: OverlayRef, @Inject(OVERLAY_CONNECTED_DATA) private data: { productId: number }) {
  }

  ngOnInit(): void {
    this.product$ = this.httpClient.get<Product>(`http://localhost:4200/api/product/${this.data.productId}`);
  }

  closeOverlay(): void {
    this.overlayRef.dispose();
  }
}
