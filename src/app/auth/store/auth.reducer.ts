import { Answer } from 'src/app/questions/answer.model';
import * as AuthActions from './auth.actions';
export interface State {
  answers: Answer[];
}

export function AuthReducer(state: State, action: AuthActions.AuthAction) {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
}
