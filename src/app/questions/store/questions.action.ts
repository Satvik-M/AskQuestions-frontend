import { createAction, props } from '@ngrx/store';
import { Question } from '../questions.model';

export const AddQuestion = createAction(
  '[Question] Add Question',
  props<{ question: Question }>()
);

export const FetchQuestions = createAction('[Question] Fetch Questions');

export const SetQuestions = createAction(
  '[Question] Set Questions',
  props<{ questions: Question[] }>()
);
