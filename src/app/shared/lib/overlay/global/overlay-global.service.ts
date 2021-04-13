import {Injectable, Injector} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';

@Injectable()
export class OverlayGlobalService {

  constructor(private overlay: Overlay, private injector: Injector) {
  }

}
