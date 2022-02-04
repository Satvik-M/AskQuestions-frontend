import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Question } from './questions.model';
import * as QuestionActions from './store/questions.action';

@Injectable({ providedIn: 'root' })
export class QuestionDetailResolver implements Resolve<Question> {
  currentQuestion: Question;
  constructor(private store: Store<fromApp.AppState>) {}

  recipeFromStore() {
    this.store
      .select('question')
      .pipe(
        take(1),
        map((questionState) => questionState.currentQuestion)
      )
      .subscribe((currentQuestion) => {
        this.currentQuestion = currentQuestion;
      });
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.recipeFromStore();
    if (!this.currentQuestion) {
      let id = route.params['id'];
      console.log(id);
      this.store.dispatch(QuestionActions.FetchCurrentQuestion({ id: id }));
    }
    return this.currentQuestion;
  }
}
