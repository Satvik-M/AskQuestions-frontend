import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Question } from '../questions.model';
import { Injectable } from '@angular/core';
import * as QuestionActions from './questions.action';

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
      switchMap((questionState) => {
        return this.http.get<Question[]>('http://localhost:3000/questions');
      }),
      map((questions) => {
        return QuestionActions.SetQuestions({ questions });
      })
    )
  );
}
