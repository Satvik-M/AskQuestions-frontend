import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store<fromApp.AppState>) {}

  private timer: any = null;
  setLogoutTimer(expiresIn: number) {
    this.timer = setTimeout(() => {
      console.log(this.timer, expiresIn);
      console.log('service logout');
      this.store.dispatch(AuthActions.Logout());
    }, expiresIn);
  }

  clearLogoutTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
