import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as CommonActions from './store/common.action';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private store: Store<fromApp.AppState>) {}
  timeout = null;
  addMessage(message: string) {
    this.clearMessage();
    this.store.dispatch(CommonActions.addMessage({ message: message }));
    this.timeout = setTimeout(() => {
      this.clearMessage();
    }, 6000);
  }
  clearMessage() {
    if (this.timeout) {
      this.store.dispatch(CommonActions.clearMessage());
      clearTimeout(this.timeout);
    }
  }
}
