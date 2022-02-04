import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as QuestionActions from './store/questions.action';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  constructor(private store: Store<fromApp.AppState>) {}
  loadQuestion(id: string) {
    this.store.dispatch(QuestionActions.FetchCurrentQuestion({ id: id }));
  }
}
