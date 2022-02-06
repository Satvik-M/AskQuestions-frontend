import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store<fromApp.AppState>) {}
  timer: any;
  setLogoutTimer(expiresIn) {
    setTimeout(() => {
      this.timer = this.store.dispatch(AuthActions.Logout());
    }, expiresIn * 1000);
  }

  clearLogoutTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }
}
