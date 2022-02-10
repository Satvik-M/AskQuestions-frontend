import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../auth/user.model';
import * as fromApp from '../store/app.reducer';
import { Question } from './questions.model';
import * as QuestionActions from './store/questions.action';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  constructor(private store: Store<fromApp.AppState>) {}

  loadQuestion(id: string) {
    this.store.dispatch(QuestionActions.FetchCurrentQuestion({ id: id }));
  }

  questionUpvote(paramQuestion: Question, user: User) {
    let question = { ...paramQuestion };
    if (
      question.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === -1
      ) !== -1
    ) {
      const index = question.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === -1
      );
      const newVotes = question.votes.slice();
      newVotes.splice(+index, 1);
      question.votes = newVotes;
      question.upvotes = question.upvotes + 1;
    } else if (
      question.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === 1
      ) !== -1
    ) {
      console.log(2);
      return;
    }
    question.upvotes = question.upvotes + 1;
    const votes = [...question.votes, { user: user._id, value: 1 }];
    question.votes = votes;
    this.store.dispatch(
      QuestionActions.VoteQuestion({ question: question, value: 1 })
    );
  }

  questionDownvote(paramQuestion: Question, user: User) {
    let question = { ...paramQuestion };
    if (
      question.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === -1
      ) !== -1
    ) {
      return;
    } else if (
      question.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === 1
      ) !== -1
    ) {
      const index = question.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === 1
      );
      const newVotes = question.votes.slice();
      newVotes.splice(+index, 1);
      question.votes = newVotes;
      question.upvotes = question.upvotes - 1;
    }
    question.upvotes = question.upvotes - 1;
    const votes = [...question.votes, { user: user._id, value: -1 }];
    question.votes = votes;
    this.store.dispatch(
      QuestionActions.VoteQuestion({ question: question, value: -1 })
    );

    this.store.dispatch(
      QuestionActions.VoteQuestion({ question: question, value: -1 })
    );
  }
}
