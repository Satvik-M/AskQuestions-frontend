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

  editQuestion(editedQuestion: Question) {
    let current: Question;
    this.store
      .select('question')
      .pipe(
        take(1),
        map((questionState) => questionState.currentQuestion)
      )
      .subscribe((currentQuestion) => (current = currentQuestion));
    if (current && editedQuestion._id === current._id) {
      return QuestionActions.SetCurrentQuestion({
        question: editedQuestion,
      });
    }
    let allQuestions: Question[];
    this.store
      .select('question')
      .pipe(
        take(1),
        map((questionState) => questionState.questions)
      )
      .subscribe((questions) => {
        allQuestions = questions;
      });
    let newArray = allQuestions.slice();
    for (let index in allQuestions) {
      if (allQuestions[index]._id === editedQuestion._id) {
        newArray[index] = editedQuestion;
      }
    }
    return QuestionActions.SetQuestions({ questions: newArray });
  }

  editAnswer(answer: Answer) {
    let allAnswers: Answer[];
    this.store
      .select('question')
      .pipe(
        take(1),
        map((questionState) => questionState.answers)
      )
      .subscribe((questions) => {
        allAnswers = questions;
      });
    let newArray = allAnswers.slice();
    for (let index in allAnswers) {
      if (allAnswers[index]._id === answer._id) {
        newArray[index] = answer;
      }
    }
    return QuestionActions.SetAnswers({ answers: newArray });
  }

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

  VoteQuestion = createEffect(() => {
    return this.action$.pipe(
      ofType(QuestionActions.VoteQuestion),
      switchMap((action) => {
        let url = '';
        if (action.value === 1) {
          url =
            'http://localhost:3000/questions/' +
            action.question._id +
            '/upvote';
        } else {
          url =
            'http://localhost:3000/questions/' +
            action.question._id +
            '/downvote';
        }
        return this.http.get(url).pipe(
          map((res) => {
            return this.editQuestion(action.question);
          })
        );
      })
    );
    // );
  });

  VoteAnswer = createEffect(() => {
    return this.action$.pipe(
      ofType(QuestionActions.VoteAnswer),
      switchMap((action) => {
        let url = '';
        if (action.value === 1) {
          url =
            'http://localhost:3000/questions/' +
            action.answer.question +
            '/answers/' +
            action.answer._id +
            '/upvote';
        } else {
          url =
            'http://localhost:3000/questions/' +
            action.answer.question +
            '/answers/' +
            action.answer._id +
            '/downvote';
        }
        return this.http.get(url).pipe(
          map((res) => {
            let allAnswers: Answer[];
            this.store
              .select('question')
              .pipe(
                take(1),
                map((questionState) => questionState.answers)
              )
              .subscribe((questions) => {
                allAnswers = questions;
              });
            let newArray = allAnswers.slice();
            for (let index in allAnswers) {
              if (allAnswers[index]._id === action.answer._id) {
                newArray[index] = action.answer;
              }
            }
            return QuestionActions.SetAnswers({ answers: newArray });
          })
        );
      })
    );
    // );
  });

  editQuestionEffect = createEffect(() => {
    return this.action$.pipe(
      ofType(QuestionActions.EditQuestion),
      switchMap((action) => {
        return this.http
          .put('http://localhost:3000/questions/' + action.question._id, {
            question: action.question,
          })
          .pipe(
            map((res) => {
              return this.editQuestion(action.question);
            }),
            catchError((errRes) => {
              console.log(errRes);
              return of({ type: 'Dummy' });
            })
          );
      })
    );
  });

  editAnswerEffect = createEffect(() => {
    return this.action$.pipe(
      ofType(QuestionActions.EditAnswer),
      switchMap((action) => {
        console.log(action.answer._id);
        return this.http
          .put(
            'http://localhost:3000/questions/' +
              action.answer.question +
              '/answers/' +
              action.answer._id,
            { answer: action.answer }
          )
          .pipe(
            map((res) => {
              return this.editAnswer(action.answer);
            })
          );
      })
    );
  });
}
