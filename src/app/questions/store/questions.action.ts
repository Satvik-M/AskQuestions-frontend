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
    title: string;
    description: string;
    author: string;
  }>()
);

export const EditQuestion = createAction(
  '[Question] Edit Question',
  props<{ question: Question }>()
);

export const EditAnswer = createAction(
  '[Question] Edit Answer',
  props<{ answer: Answer }>()
);

export const VoteQuestion = createAction(
  '[Question] Vote Question',
  props<{ question: Question; value: number }>()
);

export const VoteAnswer = createAction(
  '[Question] Vote Answer',
  props<{ answer: Answer; value: number }>()
);

export const deleteQuestion = createAction(
  '[Question] Delete Question',
  props<{ id: string }>()
);

export const deleteAnswer = createAction(
  '[Answer] Delete Answer',
  props<{ questionId: string; answerId: string }>()
);
