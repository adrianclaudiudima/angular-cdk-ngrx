import {Injectable, Injector, Type} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {RightMenuOverlayComponent} from './right-menu-overlay/right-menu-overlay.component';
import {RIGHT_MENU_COMPONENT_TYPE, RIGHT_MENU_DATA} from './model/right-menu-overlay.model';
import {RightMenuAbstractComponent} from './model/right-menu-abstract.component';

@Injectable()
export class OverlayGlobalService {

  constructor(private overlay: Overlay, private injector: Injector) {
  }

  public openGlobalOverlay<T extends RightMenuAbstractComponent>(componentType: Type<T>, data: any): void {
    const overlayRef: OverlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      height: '100%',
      width: '100%'
    });
    const componentPortal: ComponentPortal<RightMenuOverlayComponent> = new ComponentPortal<RightMenuOverlayComponent>(
      RightMenuOverlayComponent, null, this.createInjector(overlayRef, componentType, data));
    componentPortal.attach(overlayRef);
  }

  private createInjector<T extends RightMenuAbstractComponent>(overlayRef: OverlayRef, componentType: Type<T>, data: any): Injector {
    return Injector.create({
      name: 'Global Injector',
      parent: this.injector,
      providers: [
        {
          provide: OverlayRef,
          useValue: overlayRef
        }, {
          provide: RIGHT_MENU_COMPONENT_TYPE,
          useValue: componentType
        }, {
          provide: RIGHT_MENU_DATA,
          useValue: data
        }
      ]
    });
  }


}
