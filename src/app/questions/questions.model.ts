import { User } from '../auth/user.model';

export class Question {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public upvotes: number,
    public author: User,
    public votes: { user: string; value: number }[]
  ) {}
}
