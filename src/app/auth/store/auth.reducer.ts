import { createReducer, on } from '@ngrx/store';
import { Answer } from 'src/app/questions/answer.model';
import * as AuthActions from './auth.actions';
export interface State {
  user: boolean;
}
const initialState = {
  user: false,
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.Login, (state) => {
    return { ...state, user: true };
  }),
  on(AuthActions.Logout, (state) => {
    return { ...state, user: false };
  })
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}
