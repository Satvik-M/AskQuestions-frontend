import { Component, OnInit } from '@angular/core';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  modal: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(AuthActions.AutoLogin());
    this.store
      .select('common')
      .pipe(map((commonState) => commonState.modal))
      .subscribe((displayModal) => (this.modal = displayModal));
  }
}
