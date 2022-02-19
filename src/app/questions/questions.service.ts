import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../auth/user.model';
import * as fromApp from '../store/app.reducer';
import { Answer } from './answer.model';
import { Question } from './questions.model';
import * as QuestionActions from './store/questions.action';
import * as CommonActions from '../shared/store/common.action';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  constructor(private store: Store<fromApp.AppState>) {}

  loadQuestion(id: string) {
    this.store.dispatch(QuestionActions.FetchCurrentQuestion({ id: id }));
  }

  questionUpvote(paramQuestion: Question, user: User) {
    if (!user) {
      this.store.dispatch(CommonActions.openModal());
      return;
    }
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
    if (!user) {
      this.store.dispatch(CommonActions.openModal());
      return;
    }
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
  }

  answerUpvoting(paramAnswer: Answer, user: User) {
    if (!user) {
      this.store.dispatch(CommonActions.openModal());
      return;
    }
    let answer = { ...paramAnswer };
    if (
      answer.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === -1
      ) !== -1
    ) {
      const index = answer.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === -1
      );
      const newVotes = answer.votes.slice();
      newVotes.splice(+index, 1);
      answer.votes = newVotes;
      answer.upvotes = answer.upvotes + 1;
    } else if (
      answer.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === 1
      ) !== -1
    ) {
      return;
    }
    answer.upvotes = answer.upvotes + 1;
    const votes = [...answer.votes, { user: user._id, value: 1 }];
    answer.votes = votes;
    this.store.dispatch(
      QuestionActions.VoteAnswer({ answer: answer, value: 1 })
    );
  }
  answerDownvoting(paramAnswer: Answer, user: User) {
    if (!user) {
      this.store.dispatch(CommonActions.openModal());
      return;
    }
    let answer = { ...paramAnswer };
    if (
      answer.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === -1
      ) !== -1
    ) {
      return;
    } else if (
      answer.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === 1
      ) !== -1
    ) {
      const index = answer.votes.findIndex(
        (vote) => vote.user === user._id && vote.value === 1
      );
      const newVotes = answer.votes.slice();
      newVotes.splice(+index, 1);
      answer.votes = newVotes;
      answer.upvotes = answer.upvotes - 1;
    }
    answer.upvotes = answer.upvotes - 1;
    const votes = [...answer.votes, { user: user._id, value: -1 }];
    answer.votes = votes;
    this.store.dispatch(
      QuestionActions.VoteAnswer({ answer: answer, value: -1 })
    );
  }
}
