import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Question } from '../questions.model';
import { Injectable } from '@angular/core';
import * as QuestionActions from './questions.action';
import { Answer } from '../answer.model';

@Injectable()
export class QuestionEffects {
  constructor(
    private action$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}

  fetchQuestions = createEffect(() =>
    this.action$.pipe(
      ofType('[Question] Fetch Questions'),
      switchMap(() => {
        return this.http.get<Question[]>('http://localhost:3000/questions');
      }),
      map((questions) => {
        return QuestionActions.SetQuestions({ questions });
      })
    )
  );

  fetchAnswers = createEffect(() => {
    return this.action$.pipe(
      ofType('[Question] Fetch Answers'),
      switchMap(({ id }) => {
        return this.http.get(
          'http://localhost:3000/questions/' + id + '/answers'
        );
      }),
      map((answers: { answers: Answer[] }) => {
        console.log(answers);
        return QuestionActions.SetAnswers({ answers: answers.answers });
      })
    );
  });

  fetchCurrentQuestion = createEffect(() => {
    return this.action$.pipe(
      ofType('[Question] Fetch Current Question'),
      switchMap(({ id }) => {
        return this.http.get('http://localhost:3000/questions/' + id);
      }),
      map((question: Question) => {
        return QuestionActions.SetCurrentQuestion({ question: question });
      })
    );
  });
}
