import { createAction, props } from '@ngrx/store';
import { Answer } from '../answer.model';
import { Question } from '../questions.model';

export const FetchQuestions = createAction('[Question] Fetch Questions');

export const SetQuestions = createAction(
  '[Question] Set Questions',
  props<{ questions: Question[] }>()
);

export const FetchAnswers = createAction(
  '[Question] Fetch Answers',
  props<{ id: string }>()
);

export const SetAnswers = createAction(
  '[Question] Set Answers',
  props<{ answers: Answer[] }>()
);

export const SetCurrentQuestion = createAction(
  '[Question] Set Current Question',
  props<{ question: Question }>()
);

export const FetchCurrentQuestion = createAction(
  '[Question] Fetch Current Question',
  props<{ id: string }>()
);

export const AddAnswer = createAction(
  '[Question] Add Answer',
  props<{
    id: string;
    answer: string;
    author: string;
  }>()
);

export const AddQuestion = createAction(
  '[Question] Add Question',
  props<{
    id: string;
    title: string;
    description: string;
  }>()
);
