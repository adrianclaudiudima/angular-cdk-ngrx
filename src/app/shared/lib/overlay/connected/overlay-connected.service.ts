import {ElementRef, Injectable, Injector} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ProductWidgetComponent} from '../../../components/products/product-widget/product-widget.component';
import {OVERLAY_CONNECTED_DATA} from './overlay-connected.model';

@Injectable()
export class OverlayConnectedService {

  constructor(private overlay: Overlay, private injector: Injector) {
  }

  public openConnectedToElementOverlay(connectedTo: ElementRef, data: any): void {
    const overlayRef: OverlayRef = this.overlay.create({
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay.position().flexibleConnectedTo(connectedTo).withPositions([{
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
      }])
        .withPush(false).withLockedPosition(false),
      height: 200,
      hasBackdrop: true,
      minHeight: 200,
      width: 300,
      minWidth: 300
    });
    const componentPortal: ComponentPortal<ProductWidgetComponent> = new ComponentPortal<ProductWidgetComponent>(ProductWidgetComponent, null, this.createInjector(overlayRef, data));
    overlayRef.attach(componentPortal);
  }

  private createInjector(overlayRef: OverlayRef, data: any): Injector {
    return Injector.create({
      name: 'Overlay connected injector',
      parent: this.injector,
      providers: [
        {
          provide: OverlayRef,
          useValue: overlayRef
        }, {
          provide: OVERLAY_CONNECTED_DATA,
          useValue: data
        }
      ]
    });
  }

}
