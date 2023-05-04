import { pool } from "../lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { v4 as uuid } from "uuid";
import { ValidationError } from "../lib/errors";
import { Subcomment } from "./subcomment";
import { User } from "./user";
import { CommentType, CommentTypeProps } from "../types/CommentType";

interface CommentProps extends CommentTypeProps {
  replies?: Subcomment[];
  user: User;
}

interface commentsQueryResult extends RowDataPacket {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  score: number;
}

export class Comment extends CommentType {
  replies?: Subcomment[];
  user: User;

  constructor({
    id,
    content,
    userId,
    createdAt,
    updatedAt,
    score,
    replies,
    user,
  }: CommentProps) {
    super(content, userId, id, score, createdAt, updatedAt);
    this.replies = replies;
    this.user = user;
    this._validate();
  }

  async insert() {
    this.id = this.id ?? uuid();
    this._validate();

    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO `comments_table`(`id`, `content`, `userId`) VALUES (:id, :content, :userId);",
      {
        id: this.id,
        content: this.content,
        userId: this.userId,
      }
    );
    if (result.affectedRows) {
      return this.id;
    }
  }

  async update() {
    if (!this.id) {
      throw new ValidationError("Comment id required");
    }

    this._validate();

    const { affectedRows } = (
      await pool.execute<ResultSetHeader>(
        "UPDATE `comments_table` SET `content`= :content, `updatedAt`= :updatedAt, `score` = :score WHERE `id` = :id",
        {
          id: this.id,
          content: this.content,
          score: this.score,
          updatedAt: new Date().toISOString(),
        }
      )
    )[0];
    if (affectedRows) {
      return true;
    }
  }

  async delete() {
    if (!this.id) {
      throw new ValidationError("Comment id required");
    }

    const { affectedRows } = (
      await pool.execute<ResultSetHeader>(
        "DELETE FROM `comments_table` WHERE `id` = :id",
        {
          id: this.id,
        }
      )
    )[0];
    if (affectedRows) {
      return true;
    }
  }

  static async findById(id: string) {
    if (!id) {
      throw new Error("Comment ID is required!");
    }

    const [[commentFound]] = await pool.execute<commentsQueryResult[]>(
      "SELECT * FROM `comments_table` WHERE `id` = :id",
      {
        id: id,
      }
    );
    if (!commentFound) return null;
    return new Comment({
      ...commentFound,
      replies: await Subcomment.findAll(commentFound.id as string),
      user: await User.findById(commentFound.userId as string),
    });
  }

  static async findAll() {
    const [results] = await pool.execute<commentsQueryResult[]>(
      "SELECT * FROM `comments_table` ORDER BY `comments_table`.`createdAt` ASC;"
    );
    if (results.length === 0) return [];

    return Promise.all(
      results.map(
        async (result) =>
          new Comment({
            ...result,
            replies: await Subcomment.findAll(result.id as string),
            user: await User.findById(result.userId as string),
          })
      )
    );
  }
}
