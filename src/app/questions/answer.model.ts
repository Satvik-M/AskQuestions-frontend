import { User } from '../auth/user.model';
import { Question } from './questions.model';

export class Answer {
  constructor(
    public answer: string,
    public question: string,
    public upvotes: number,
    public author: string,
    public votes: { user: string; value: number }[],
    public _id: string
  ) {}
}
