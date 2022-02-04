import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as QuestionActions from '../store/questions.action';
import * as fromApp from '../../store/app.reducer';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../answer.model';
import { map, tap } from 'rxjs/operators';

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
  @ViewChild('form') form: NgForm;

  onSubmit() {
    console.log(this.newAnswer);
    console.log(this.form);
    this.form.reset();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.questionId = params['id'];
    });
    this.store.dispatch(QuestionActions.FetchAnswers({ id: this.questionId }));
    this.store
      .select('question')
      .pipe(
        // tap((questionState) => {
        //   if (!questionState.currentQuestion) {
        //     this.store.dispatch(
        //       QuestionActions.FetchCurrentQuestion({ id: this.questionId })
        //     );
        //   }
        // }),
        map((questionState) => questionState.answers)
      )
      .subscribe((answers) => {
        this.answers = answers;
        console.log(this.answers);
      });
  }
  ngOnDestroy(): void {}
}
