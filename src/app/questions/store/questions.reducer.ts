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
  isLoadingQuestions: boolean;
  isLoadingAnswers: boolean;
}

const initialState: State = {
  newQuestion: null,
  questions: null,
  answers: null,
  currentQuestion: null,
  isLoadingQuestions: false,
  isLoadingAnswers: false,
};

const _QuestionReducer = createReducer(
  initialState,
  on(QuestionActions.FetchQuestions, (state) => {
    return { ...state, isLoadingQuestions: true };
  }),
  on(QuestionActions.SetQuestions, (state, { questions }) => {
    return {
      ...state,
      questions: questions,
      isLoadingQuestions: false,
    };
  }),
  on(QuestionActions.FetchAnswers, (state) => {
    return { ...state, isLoadingAnswers: true };
  }),
  on(QuestionActions.SetAnswers, (state, { answers }) => {
    return {
      ...state,
      answers: answers,
      isLoadingAnswers: false,
    };
  }),
  on(QuestionActions.SetCurrentQuestion, (state, { question }) => {
    return {
      ...state,
      currentQuestion: question,
      isLoadingQuestions: false,
    };
  }),
  on(QuestionActions.FetchCurrentQuestion, (state) => {
    return { ...state, isLoadingQuestions: true };
  }),
  on(QuestionActions.AddAnswer, (state) => {
    return { ...state };
  }),
  on(QuestionActions.AddQuestion, (state, action) => {
    return { ...state };
  })
);

export function QuestionReducer(state, action) {
  return _QuestionReducer(state, action);
}
