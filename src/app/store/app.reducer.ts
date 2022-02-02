import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromQuestion from '../questions/store/questions.reducer';

export interface AppState {
  auth: fromAuth.State;
  question: fromQuestion.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer,
  question: fromQuestion.QuestionReducer,
};
