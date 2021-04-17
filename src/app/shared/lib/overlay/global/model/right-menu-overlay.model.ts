import {InjectionToken} from '@angular/core';
import {RightMenuAbstractComponent} from './right-menu-abstract.component';

export const RIGHT_MENU_COMPONENT_TYPE: InjectionToken<RightMenuAbstractComponent> = new InjectionToken<RightMenuAbstractComponent>('RIGHT_MENU_COMPONENT_TYPE');
export const RIGHT_MENU_DATA: InjectionToken<any> = new InjectionToken<any>('RIGHT MENU DATA');

// tslint:disable-next-line:no-empty-interface
export interface RightMenuData {

}

