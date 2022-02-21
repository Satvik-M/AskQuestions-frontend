import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  error = null;
  sub: Subscription;
  loginData: { email: string; password: string } = { email: '', password: '' };
  ngOnInit(): void {
    this.sub = this.store
      .select('auth')
      .pipe(map((authState) => authState.errMessage))
      .subscribe((err) => (this.error = err));
  }
  onSubmit(form: NgForm) {
    this.store.dispatch(AuthActions.clearError());
    this.store.dispatch(
      AuthActions.StartLogin({
        email: this.loginData.email,
        password: this.loginData.password,
      })
    );
    this.loginData = { email: '', password: '' };
  }
  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
    this.sub.unsubscribe();
  }
}
