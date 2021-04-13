import {animate, group, query, style, transition, trigger} from '@angular/animations';

export const fadeInOutTrigger = trigger('fadeInOut', [
  transition('* => shown', [
    group([
      query('.right-menu-overlay__left', [
        style({
          opacity: 0
        }),
        animate('0.5s 0.25s cubic-bezier(.17,.67,.42,.72)', style({
          opacity: 0.6,
        }))
      ]),
      query('.right-menu-overlay__right', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('0.5s cubic-bezier(.32,.67,.54,1)', style({
          transform: 'translateX(0)'
        }))
      ])

    ])
  ]),
  transition('* => hidden', [
    group([
      query('.right-menu-overlay__left', [
        style({
          opacity: 0.6
        }),
        animate('0.5s cubic-bezier(.17,.67,.42,.72)', style({
          opacity: 0,
        }))
      ]),
      query('.right-menu-overlay__right', [
        style({
          transform: 'translateX(0)'
        }),
        animate('0.5s 0.1s ease-out', style({
          transform: 'translateX(100%)'
        }))
      ])

    ])
  ])
]);
