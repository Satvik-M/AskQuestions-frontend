import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const { username, email, password } = form.value;
    this.store.dispatch(
      AuthActions.StartRegister({
        username: username,
        password: password,
        email: email,
      })
    );
    form.reset();
  }
}
