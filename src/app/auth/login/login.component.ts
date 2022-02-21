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
export class LoginComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}
  loginData: { email: string; password: string } = { email: '', password: '' };
  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.store.dispatch(
      AuthActions.StartLogin({
        email: this.loginData.email,
        password: this.loginData.password,
      })
    );
    this.loginData = { email: '', password: '' };
    form.reset();
  }
}
