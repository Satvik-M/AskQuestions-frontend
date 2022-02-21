import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as QuestionActions from '../store/questions.action';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css'],
})
export class NewQuestionComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  userid: string;
  authSub: Subscription;
  questionData: { title: string; description: string } = {
    title: '',
    description: '',
  };

  ngOnInit(): void {
    this.authSub = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        if (user) {
          this.userid = user._id;
        }
      });
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(
      QuestionActions.AddQuestion({
        title: this.questionData.title,
        description: this.questionData.description,
        author: this.userid,
      })
    );
    this.questionData.title = '';
    this.questionData.description = '';
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }
}
