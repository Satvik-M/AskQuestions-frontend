import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  faAngleUp,
  faAngleDown,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as QuestionActions from '../store/questions.action';
import * as fromApp from '../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from '../answer.model';
import { map, tap } from 'rxjs/operators';
import { Question } from '../questions.model';
import { QuestionsService } from '../questions.service';
import { User } from 'src/app/auth/user.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private questionService: QuestionsService,
    private router: Router
  ) {}
  faangleup = faAngleUp;
  faangledown = faAngleDown;
  faedit = faEdit;
  fatrash = faTrash;
  answers: Answer[];
  newAnswer: string = '';
  questionId;
  question: Question;
  userId: string;
  user: User;
  isLoadingQuestions = false;
  isLoadingAnswers = false;
  editQuestion = false;
  editAnswer: string = null;

  onSubmit(form: NgForm) {
    this.store.dispatch(
      QuestionActions.AddAnswer({
        id: this.questionId,
        answer: form.value.answer,
        author: this.userId,
      })
    );
    form.reset();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.questionId = params['id'];
    });
    this.route.queryParams.subscribe((queryParams) => {
      this.editQuestion = queryParams['editQuestion'];
      this.editAnswer = queryParams['editAnswer'];
      console.log(this.editQuestion);
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
        if (user) {
          this.user = user;
          this.userId = user._id;
        } else this.userId = null;
      });
  }
  ngOnDestroy(): void {
    this.store.dispatch(QuestionActions.SetCurrentQuestion({ question: null }));
  }
  upvoteQuestion(paramQuestion: Question) {
    this.questionService.questionUpvote(paramQuestion, this.user);
  }
  downvoteQuestion(paramQuestion: Question) {
    this.questionService.questionDownvote(paramQuestion, this.user);
  }
  upvoteAnswer(paramAnswer: Answer) {
    this.questionService.answerUpvoting(paramAnswer, this.user);
  }
  downvoteAnswer(paramAnswer: Answer) {
    this.questionService.answerDownvoting(paramAnswer, this.user);
  }
  toEditQuestion(question: Question) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { editQuestion: true },
    });
  }
  toEditAnswer(answer: Answer) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { editAnswer: answer._id },
    });
  }

  onEditQuestionSubmit(form: NgForm) {
    const editQuestion = { ...this.question };
    console.log(form.value.description);
    editQuestion.description = form.value.description;
    this.store.dispatch(
      QuestionActions.EditQuestion({ question: editQuestion })
    );
    this.router.navigate([], { relativeTo: this.route });
  }

  onEditAnswerSubmit(form: NgForm) {
    const editAnswer = {
      ...this.answers.find((answer) => answer._id === this.editAnswer),
    };
    console.log(editAnswer);
    console.log(form.value);
    editAnswer.answer = form.value.answer;
    this.store.dispatch(QuestionActions.EditAnswer({ answer: editAnswer }));
    this.router.navigate([], { relativeTo: this.route });
  }

  toDeleteQuestion(question: Question) {
    this.store.dispatch(QuestionActions.deleteQuestion({ id: question._id }));
  }

  toDeleteAnswer(answer: Answer) {
    this.store.dispatch(
      QuestionActions.deleteAnswer({
        answerId: answer._id,
        questionId: this.questionId,
      })
    );
  }
}
