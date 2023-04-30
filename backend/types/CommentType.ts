import { ValidationError } from "../lib/errors";

export interface CommentTypeProps {
  content: string;
  userId: string;
  id?: string;
  score?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class CommentType implements CommentTypeProps {
  constructor(
    public content: string,
    public userId: string,
    public id?: string,
    public score?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  _validate() {
    if (this.content.trim().length < 5) {
      throw new ValidationError("Comment should include at least 1 character!");
    } else if (this.content.trim().length > 255) {
      throw new ValidationError(
        "Comment should include at most 255 characters!"
      );
    }

    if (!this.userId) {
      throw new ValidationError("UserId is required!");
    }
  }
}
