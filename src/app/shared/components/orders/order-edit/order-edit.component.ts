import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {OverlayGlobalService} from '../../../lib/overlay/global/overlay-global.service';
import {OrderEditOverlayComponent} from '../../../lib/overlay/global/order-edit-overlay/order-edit-overlay.component';

@Component({
  selector: 'app-order-edit',
  templateUrl: 'order-edit.component.html',
  styleUrls: ['order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  overlayObservable$: Observable<any>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private overlayGlobalService: OverlayGlobalService) {
  }

  ngOnInit(): void {
    this.overlayObservable$ = this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(orderId => this.overlayGlobalService.openGlobalOverlayWithObservable<OrderEditOverlayComponent>(OrderEditOverlayComponent, {orderId})),
      tap(overlayResponse => this.router.navigate(['../'], {relativeTo: this.activatedRoute}))
    );
  }

}
