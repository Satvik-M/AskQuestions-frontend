import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

interface Authres {
  user: User;
  token: string;
  expiresIn: number;
}

@Injectable()
export class AuthEffects {
  handleError = (errRes) => {
    console.log(errRes);
    let errMessage = 'Some error occured at our end';
    if (errRes.error.message) errMessage = errRes.error.message;
    return of(AuthActions.AuthenticateFail({ errMessage: errMessage }));
  };

  handleAuthentication = (authRes: Authres) => {
    console.log(authRes);
    localStorage.setItem('token', authRes.token);
    this.authService.setLogoutTimer(authRes.expiresIn);
    const expirationDate = new Date(new Date().getTime() + +authRes.expiresIn);
    return AuthActions.AuthenticateSuccess({
      username: authRes.user.username,
      email: authRes.user.email,
      password: authRes.user.password,
      isVerified: authRes.user.isVerified,
      expirationDate: expirationDate,
    });
  };

  startRegister = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.StartRegister),
      switchMap((action) => {
        console.log(action);
        return this.http
          .post<Authres>('http://localhost:3000/users/register', {
            email: action.email,
            username: action.username,
            password: action.password,
          })
          .pipe(
            map((res) => {
              return this.handleAuthentication(res);
            }),
            catchError((errRes) => {
              return this.handleError(errRes);
            })
          );
      })
    );
  });
  startLogin = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.StartLogin),
      switchMap((action) => {
        console.log(action);
        return this.http
          .post<Authres>('http://localhost:3000/users/login', {
            email: action.email,
            password: action.password,
          })
          .pipe(
            map((authRes) => {
              return this.handleAuthentication(authRes);
            }),
            catchError((errRes) => {
              return this.handleError(errRes);
            })
          );
      })
    );
  });
  constructor(
    private action$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient,
    private authService: AuthService
  ) {}
}
