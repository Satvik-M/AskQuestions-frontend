import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  registerData: { username: string; email: string; password: string } = {
    username: '',
    email: '',
    password: '',
  };
  error = null;
  sub: Subscription;
  ngOnInit(): void {
    this.sub = this.store
      .select('auth')
      .pipe(map((authState) => authState.errMessage))
      .subscribe((err) => (this.error = err));
  }
  onSubmit(form: NgForm) {
    this.store.dispatch(AuthActions.clearError());
    this.store.dispatch(
      AuthActions.StartRegister({
        username: this.registerData.username,
        password: this.registerData.password,
        email: this.registerData.email,
      })
    );
    this.registerData = {
      username: '',
      email: '',
      password: '',
    };
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
    this.sub.unsubscribe();
  }
}
