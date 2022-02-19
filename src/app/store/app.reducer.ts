import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromQuestion from '../questions/store/questions.reducer';
import * as fromCommon from '../shared/store/common.reducer';

export interface AppState {
  auth: fromAuth.State;
  question: fromQuestion.State;
  common: fromCommon.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer,
  question: fromQuestion.QuestionReducer,
  common: fromCommon.CommonReducer,
};
