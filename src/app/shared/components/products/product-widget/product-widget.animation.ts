import {animate, style, transition, trigger} from '@angular/animations';

export const productWidgetAnimation = trigger('shownHidden', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(300, style({
      opacity: 1
    }))
  ]),
  transition('opened => closed', [
    style({
      opacity: 1
    }),
    animate(300, style({
      opacity: 0
    }))
  ])
]);
