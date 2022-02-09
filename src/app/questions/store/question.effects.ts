import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Question } from '../questions.model';
import { Injectable } from '@angular/core';
import * as QuestionActions from './questions.action';
import { Answer } from '../answer.model';
import { of } from 'rxjs';

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
        console.log(id);
        return this.http.get('http://localhost:3000/questions/' + id);
      }),
      map((question: Question) => {
        return QuestionActions.SetCurrentQuestion({ question: question });
      })
    );
  });

  addAnswer = createEffect(() => {
    return this.action$.pipe(
      ofType(QuestionActions.AddAnswer),
      switchMap((action) => {
        return this.http
          .post('http://localhost:3000/questions/' + action.id + '/answers', {
            answer: action.answer,
            author: action.author,
          })
          .pipe(
            map((res: Answer) => {
              let ans: Answer[];
              this.store
                .select('question')
                .pipe(
                  take(1),
                  map((questionState) => questionState.answers)
                )
                .subscribe((answers) => {
                  ans = answers;
                });
              const newAns = new Answer(
                res.answer,
                action.id,
                res.upvotes,
                res.author,
                res.votes,
                res._id
              );
              return QuestionActions.SetAnswers({ answers: [...ans, newAns] });
            })
          );
      })
    );
  });

  AddQuestion = createEffect(
    () => {
      return this.action$.pipe(
        ofType(QuestionActions.AddQuestion),
        switchMap((action) => {
          return this.http
            .post('http://localhost:3000/questions', {
              title: action.title,
              description: action.description,
              author: action.id,
            })
            .pipe(
              map((res) => {
                console.log(res);
              }),
              catchError((errRes) => {
                return of(console.log(errRes));
              })
            );
        })
      );
    },
    { dispatch: false }
  );
}
