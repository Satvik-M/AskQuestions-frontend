import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
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
    const expirationDate = new Date(new Date().getTime() + +authRes.expiresIn);
    const user = new User(
      authRes.user.username,
      authRes.user.isVerified,
      authRes.user.password,
      authRes.user.email,
      expirationDate,
      authRes.token,
      authRes.user._id
    );
    localStorage.setItem('user', JSON.stringify(user));
    this.authService.setLogoutTimer(authRes.expiresIn);
    return AuthActions.AuthenticateSuccess({
      username: authRes.user.username,
      email: authRes.user.email,
      password: authRes.user.password,
      isVerified: authRes.user.isVerified,
      expirationDate: expirationDate,
      token: authRes.token,
      redirect: true,
      _id: authRes.user._id,
    });
  };

  startRegister = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.StartRegister),
      switchMap((action) => {
        // console.log(action);
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
        // console.log(action);
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

  autoLogin = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.AutoLogin),
      // switchMap(() => {
      //   // console.log('autologin');
      //   const tokenUser = JSON.parse(localStorage.getItem('user'));
      //   if (!tokenUser) return of({ type: 'NONE' });
      //   return this.http
      //     .get('http://localhost:3000/users/login/jwt', {
      //       // params: new HttpParams().set('token', tokenUser.token),
      //     })
      //     .pipe(
      //       tap((res) => {
      //         // console.log(res);
      //       }),
      //       map((user: User) => {
      //         // console.log(tokenUser.expirationDate);
      //         // console.log(new Date(tokenUser.expirationDate).getTime());
      //         const expirationDuration =
      //           new Date(tokenUser.expirationDate).getTime() -
      //           new Date().getTime();
      //         // console.log(expirationDuration);
      //         this.authService.setLogoutTimer(expirationDuration);
      //         return AuthActions.AuthenticateSuccess({
      //           username: user.username,
      //           email: user.email,
      //           password: user.password,
      //           isVerified: user.isVerified,
      //           expirationDate: user.expirationDate,
      //           token: tokenUser.token,
      //           redirect: false,
      //           _id: user._id,
      //         });
      //       }),
      //       catchError((errRes) => {
      //         // console.log(errRes);
      //         return of(
      //           AuthActions.AuthenticateFail({
      //             errMessage: errRes.error.message,
      //           })
      //         );
      //       })
      //     );
      // })
      map(() => {
        const tokenUser = JSON.parse(localStorage.getItem('user'));
        if (!tokenUser) return { type: 'NONE' };
        const user: User = tokenUser;
        if (user.token) {
          const expirationDuration =
            new Date(tokenUser.expirationDate).getTime() - new Date().getTime();
          // console.log(expirationDuration);
          this.authService.setLogoutTimer(expirationDuration);
          return AuthActions.AuthenticateSuccess({
            username: user.username,
            email: user.email,
            password: user.password,
            isVerified: user.isVerified,
            expirationDate: user.expirationDate,
            token: tokenUser.token,
            redirect: false,
            _id: user._id,
          });
        } else return { type: 'DUMMY' };
      })
    );
  });

  logout = createEffect(
    () => {
      return this.action$.pipe(
        ofType(AuthActions.Logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );

  authenticateSuccess = createEffect(
    () => {
      return this.action$.pipe(
        ofType(AuthActions.AuthenticateSuccess),
        tap(() => {
          const redirect = '' + this.route.snapshot.queryParams['redirectURL'];
          if (this.route.snapshot.queryParams['redirectURL']) {
            this.router.navigateByUrl(redirect);
            console.log(this.route.snapshot);
          } else if (
            this.router.url === '/login' ||
            this.router.url === '/register'
          ) {
            this.router.navigate(['/questions']);
            console.log(this.route.snapshot);
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
