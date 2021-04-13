import {EventEmitter} from '@angular/core';

export abstract class RightMenuAbstractComponent {
  public data: any;
  public disposeComponentEvent: EventEmitter<boolean> = new EventEmitter();
}
