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
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  faangleup = faAngleUp;
  faangledown = faAngleDown;
  faedit = faEdit;
  fatrash = faTrash;
  questions: Question[] = null;
  isLoading: boolean = false;
  user: User;
  ngOnInit(): void {
    this.store.select('question').subscribe((questionState) => {
      // console.log(questions);
      this.questions = questionState.questions;
      this.isLoading = questionState.isLoadingQuestions;
      console.log(this.isLoading);
    });
    this.store
      .select('auth')
      .pipe(map((AuthState) => AuthState.user))
      .subscribe((user) => {
        this.user = user;
      });
    this.store.dispatch(QuestionActions.FetchQuestions());
  }
  setCurrentQuestion(question: Question) {
    this.store.dispatch(
      QuestionActions.SetCurrentQuestion({ question: question })
    );
    const questionId: string = question._id;
    console.log(question._id);
    console.log(questionId);
    this.router.navigate([questionId], { relativeTo: this.route });
  }
  upvote(question: Question) {}
  downvote(question: Question) {}
}
