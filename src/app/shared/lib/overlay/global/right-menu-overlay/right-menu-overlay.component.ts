import {ChangeDetectorRef, Component, ComponentFactoryResolver, Inject, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {fadeInOutTrigger} from './right-menu-overlay.animation';
import {OverlayRef} from '@angular/cdk/overlay';
import {RightMenuOverlayPlaceholderDirective} from './right-menu-overlay-placeholder.directive';
import {RightMenuAbstractComponent} from '../model/right-menu-abstract.component';
import {RIGHT_MENU_COMPONENT_TYPE, RIGHT_MENU_DATA} from '../model/right-menu-overlay.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-right-menu',
  templateUrl: 'right-menu-overlay.component.html',
  styleUrls: ['right-menu-overlay.component.scss', 'right-menu-overlay.theme.scss'],
  animations: [
    fadeInOutTrigger
  ]
})
export class RightMenuOverlayComponent implements OnInit, OnDestroy {

  @ViewChild(RightMenuOverlayPlaceholderDirective, {static: true})
  rightMenuOverlayPlaceholder: RightMenuOverlayPlaceholderDirective;

  constructor(
    private overlayRef: OverlayRef,
    @Inject(RIGHT_MENU_COMPONENT_TYPE) private componentType: Type<RightMenuAbstractComponent>,
    @Inject(RIGHT_MENU_DATA) private data: any,
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.createInjectedComponent(this.componentType);
  }

  closeOverlay(): void {
    this.overlayRef.dispose();
  }

  private createInjectedComponent<T extends RightMenuAbstractComponent>(componentType: Type<T>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<T>(componentType);
    const componentRef = this.rightMenuOverlayPlaceholder.viewContainerRef.createComponent<T>(componentFactory);
    componentRef.instance.data = this.data;
    this.changeDetectorRef.detectChanges();
    componentRef.instance.disposeComponentEvent.pipe(
      take(1),
    ).subscribe(() => {
      this.overlayRef.dispose();
    });

  }

}
