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
    console.log(this.userid);
    console.log(form.value);
    this.store.dispatch(
      QuestionActions.AddQuestion({
        id: this.userid,
        title: form.value.title,
        description: form.value.description,
      })
    );
    form.reset();
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }
}
