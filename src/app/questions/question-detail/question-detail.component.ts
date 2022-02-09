import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as QuestionActions from '../store/questions.action';
import * as fromApp from '../../store/app.reducer';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../answer.model';
import { map, tap } from 'rxjs/operators';
import { Question } from '../questions.model';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}
  faangleup = faAngleUp;
  faangledown = faAngleDown;
  answers: Answer[];
  newAnswer: string = '';
  questionId;
  question: Question;
  userId: string;
  isLoadingQuestions = false;
  isLoadingAnswers = false;

  onSubmit(form: NgForm) {
    // console.log(this.newAnswer);
    // console.log(form.value.answer);
    this.store.dispatch(
      QuestionActions.AddAnswer({
        id: this.questionId,
        answer: form.value.answer,
        author: this.userId,
      })
    );
    // this.answers = [...this.answers, ans];
    form.reset();
  }

  ngOnInit(): void {
    this.route.snapshot.data;
    this.route.params.subscribe((params) => {
      this.questionId = params['id'];
    });
    this.store.dispatch(QuestionActions.FetchAnswers({ id: this.questionId }));
    this.store.select('question').subscribe((QuestionState) => {
      this.answers = QuestionState.answers;
      this.question = QuestionState.currentQuestion;
      this.isLoadingQuestions = QuestionState.isLoadingQuestions;
      this.isLoadingAnswers = QuestionState.isLoadingAnswers;
      // console.log(this.answers);
    });
    this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        if (user) this.userId = user._id;
        else this.userId = null;
      });
  }
  ngOnDestroy(): void {}
}
