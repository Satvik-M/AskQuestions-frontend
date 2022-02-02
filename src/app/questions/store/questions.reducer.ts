import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Question } from '../questions.model';
import * as QuestionActions from './questions.action';

export interface State {
  newQuestion: Question;
  questions: Question[];
}

const initialState: State = {
  newQuestion: null,
  questions: null,
};

const _QuestionReducer = createReducer(
  initialState,
  on(QuestionActions.AddQuestion, (state, { question }) => {
    return { ...state, newQuestion: question };
  }),
  on(QuestionActions.FetchQuestions, (state) => {
    return { ...state };
  }),
  on(QuestionActions.SetQuestions, (state, { questions }) => {
    return {
      ...state,
      questions: questions,
    };
  })
);

export function QuestionReducer(state, action) {
  return _QuestionReducer(state, action);
}
