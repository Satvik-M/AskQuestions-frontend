export class User {
  constructor(
    public username: string,
    public isVerified: boolean,
    private password: string,
    public email: string
  ) {}
}
