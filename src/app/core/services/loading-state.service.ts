import {Injectable, Injector} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {LoadingScreenComponent} from '../component/loading-screen/loading-screen.component';

@Injectable()
export class LoadingStateService {

  private requestCount = 0;
  private requestCountSubject: Subject<number> = new Subject();
  private overlayRef: OverlayRef;
  private loadingScreenComponentPortal: ComponentPortal<LoadingScreenComponent>;
  public isLoading$: Observable<boolean> = this.requestCountSubject.asObservable().pipe(
    map(count => count !== 0),
    distinctUntilChanged()
  );

  constructor(private overlay: Overlay, private injector: Injector) {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      height: '100%',
      width: '100%'
    });
    this.loadingScreenComponentPortal = new ComponentPortal<LoadingScreenComponent>(LoadingScreenComponent, null, injector);
    this.isLoading$.subscribe(isLoading => {
      if (isLoading === true) {
        this.loadingScreenComponentPortal.attach(this.overlayRef);
      } else {
        this.loadingScreenComponentPortal.detach();
      }
    });
  }


  public incrementLoading(): void {
    this.requestCount++;
    this.requestCountSubject.next(this.requestCount);
  }

  public decrementLoading(): void {
    this.requestCount--;
    this.requestCountSubject.next(this.requestCount);
  }

}
