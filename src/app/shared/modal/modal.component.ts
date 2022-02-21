import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as commonActions from '../store/common.action';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}
  signIn = true;
  signUp = false;
  loginData: { email: string; password: string } = { email: '', password: '' };
  registerData: { username: string; email: string; password: string } = {
    username: '',
    email: '',
    password: '',
  };

  ngOnInit(): void {}

  onCancel() {
    this.store.dispatch(commonActions.closeModal());
  }
  onBoxClick(event: Event) {
    event.stopPropagation();
  }

  toSignUp() {
    this.signIn = false;
    this.signUp = true;
  }
  toSignIn() {
    this.signIn = true;
    this.signUp = false;
  }
  onLogin(form: NgForm) {
    this.store.dispatch(
      AuthActions.StartLogin({
        email: this.loginData.email,
        password: this.loginData.password,
      })
    );
    this.onCancel();
  }
  onRegister(form: NgForm) {
    this.store.dispatch(
      AuthActions.StartRegister({
        username: this.registerData.username,
        password: this.registerData.password,
        email: this.registerData.email,
      })
    );
    this.onCancel();
  }
}
