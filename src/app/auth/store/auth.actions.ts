import { Action, createAction, props } from '@ngrx/store';
import { User } from '../user.model';

export const Login = createAction('[Auth] Login');
export const Logout = createAction('[Auth] Logout');
