import { User } from '../auth/user.model';

export class Question {
  constructor(
    public title: string,
    public description: string,
    public upvotes: number,
    public author: User,
    public votes: string[]
  ) {}
}