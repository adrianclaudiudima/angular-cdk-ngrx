import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeInOutTrigger} from './right-menu-overlay.animation';

@Component({
  selector: 'app-right-menu',
  templateUrl: 'right-menu-overlay.component.html',
  styleUrls: ['right-menu-overlay.component.scss', 'right-menu-overlay.theme.scss'],
  animations: [
    fadeInOutTrigger
  ]
})
export class RightMenuOverlayComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
