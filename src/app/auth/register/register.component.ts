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
  sub: Subscription;
  ngOnInit(): void {}
  onSubmit(form: NgForm) {
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
    form.reset();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
