import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as QuestionActions from './store/questions.action';
import {
  faAngleUp,
  faAngleDown,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { map, tap } from 'rxjs/operators';
import { Question } from './questions.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}
  faangleup = faAngleUp;
  faangledown = faAngleDown;
  faedit = faEdit;
  fatrash = faTrash;
  questions: Question[] = null;
  ngOnInit(): void {
    this.store.dispatch(QuestionActions.FetchQuestions());
    this.store
      .select('question')
      .pipe(
        map((questionState) => {
          return questionState.questions;
        })
      )
      .subscribe((questions) => {
        console.log(questions);
        this.questions = questions;
      });
  }
}
