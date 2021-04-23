import {InjectionToken} from '@angular/core';
import {RightMenuAbstractComponent} from './right-menu-abstract.component';
import {Subject} from 'rxjs';

export const RIGHT_MENU_COMPONENT_TYPE: InjectionToken<RightMenuAbstractComponent> = new InjectionToken<RightMenuAbstractComponent>('RIGHT_MENU_COMPONENT_TYPE');
export const RIGHT_MENU_DATA: InjectionToken<any> = new InjectionToken<any>('RIGHT MENU DATA');
export const DISPOSE_OVERLAY: InjectionToken<Subject<any>> = new InjectionToken<Subject<any>>('DISPOSE_OVERLAY');


// tslint:disable-next-line:no-empty-interface
export interface RightMenuData {

}

