export class User {
  constructor(
    public username: string,
    public isVerified: boolean,
    public password: string,
    public email: string,
    public expirationDate: Date
  ) {}
}
