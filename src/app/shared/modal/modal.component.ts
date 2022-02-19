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
    const { email, password } = form.value;
    this.store.dispatch(
      AuthActions.StartLogin({ email: email, password: password })
    );
    this.onCancel();
  }
  onRegister(form: NgForm) {
    const { username, email, password } = form.value;
    this.store.dispatch(
      AuthActions.StartRegister({
        username: username,
        password: password,
        email: email,
      })
    );
    this.onCancel();
  }
}
