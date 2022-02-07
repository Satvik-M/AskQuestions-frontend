import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, take } from 'rxjs';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user, req);
    if (user) {
      const modifReq = req.clone({
        params: new HttpParams().set('token', user.token),
      });
      // console.log(modifReq);
      return next.handle(modifReq);
    }
    return next.handle(req);
  }
}
