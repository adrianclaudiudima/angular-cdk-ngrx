import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {LoadingStateService} from './loading-state.service';
import {finalize} from 'rxjs/operators';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingState: LoadingStateService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingState.incrementLoading();
    return next.handle(req).pipe(
      finalize(() => this.loadingState.decrementLoading())
    );
  }

}
