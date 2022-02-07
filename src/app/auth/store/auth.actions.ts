import { Action, createAction, props } from '@ngrx/store';
import { User } from '../user.model';

export const StartRegister = createAction(
  '[Auth] Start Register',
  props<{ username: string; password: string; email: string }>()
);

export const AuthenticateFail = createAction(
  '[Auth] Authentication Fail',
  props<{ errMessage: string }>()
);
export const Logout = createAction('[Auth] Logout');

export const AuthenticateSuccess = createAction(
  '[Auth] Authenticate Success',
  props<{
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    expirationDate: Date;
    token: string;
    redirect: boolean;
  }>()
);

export const StartLogin = createAction(
  '[Auth] Start Login',
  props<{ email: string; password: string }>()
);

export const AutoLogin = createAction('[Auth] Auto Login');
