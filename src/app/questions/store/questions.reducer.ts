import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Answer } from '../answer.model';
import { Question } from '../questions.model';
import * as QuestionActions from './questions.action';

export interface State {
  newQuestion: Question;
  questions: Question[];
  answers: Answer[];
  currentQuestion: Question;
}

const initialState: State = {
  newQuestion: null,
  questions: null,
  answers: null,
  currentQuestion: null,
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
  }),
  on(QuestionActions.FetchAnswers, (state) => {
    return { ...state };
  }),
  on(QuestionActions.SetAnswers, (state, { answers }) => {
    return {
      ...state,
      answers: answers,
    };
  }),
  on(QuestionActions.SetCurrentQuestion, (state, { question }) => {
    return {
      ...state,
      currentQuestion: question,
    };
  }),
  on(QuestionActions.FetchCurrentQuestion, (state) => {
    return { ...state };
  })
);

export function QuestionReducer(state, action) {
  return _QuestionReducer(state, action);
}
