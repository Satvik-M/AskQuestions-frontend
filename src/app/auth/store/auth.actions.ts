import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: User) {}
}

export type AuthAction = Login | Logout;
