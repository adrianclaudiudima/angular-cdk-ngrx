import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appRightMenuOverlayPlaceholder]'
})
export class RightMenuOverlayPlaceholderDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
