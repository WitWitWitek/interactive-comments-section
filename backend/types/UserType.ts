import { ValidationError } from "../lib/errors";

export abstract class UserType {
  constructor(
    public userId: string,
    public username: string,
    public image: {
      png: string;
      webp: string;
    }
  ) {}

  _validate() {
    if (this.username.trim().length < 3) {
      throw new ValidationError(
        "username should include at least 3 character!"
      );
    } else if (this.username.trim().length > 25) {
      throw new ValidationError(
        "username should include at most 25 characters!"
      );
    }
  }
}
