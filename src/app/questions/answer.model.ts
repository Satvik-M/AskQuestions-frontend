import { User } from '../auth/user.model';
import { Question } from './questions.model';

export class Answer {
  constructor(
    public answer: string,
    public questions: Question,
    public upvotes: number,
    author: User
  ) {}
}
