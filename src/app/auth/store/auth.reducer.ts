import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';
export interface State {
  user: User;
  isLoading: boolean;
  redirect: boolean;
}
const initialState: State = {
  user: null,
  isLoading: false,
  redirect: false,
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.StartLogin, (state) => {
    return { ...state, isLoading: true };
  }),
  on(AuthActions.StartRegister, (state) => {
    return { ...state, isLoading: true };
  }),
  on(AuthActions.Logout, (state) => {
    return { ...state, user: null };
  }),
  on(AuthActions.AuthenticateFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      user: null,
      errMessage: action.errMessage,
    };
  }),
  on(AuthActions.AuthenticateSuccess, (state, action) => {
    const user = new User(
      action.username,
      action.isVerified,
      action.password,
      action.email,
      action.expirationDate,
      action.token,
      action._id
    );
    return {
      ...state,
      user: user,
      redirect: action.redirect,
      isLoading: false,
    };
  }),
  on(AuthActions.AutoLogin, (state) => {
    return { ...state };
  }),
  on(AuthActions.clearError, (state) => {
    return { ...state };
  })
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}
