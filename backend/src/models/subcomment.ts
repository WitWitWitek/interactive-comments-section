import { pool } from "../lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { v4 as uuid } from "uuid";
import { ValidationError } from "../lib/errors";
import { User } from "./user";
import { CommentType, CommentTypeProps } from "../types/CommentType";

interface SubcommentProps extends CommentTypeProps {
  parentId: string;
  user: User;
}

interface subcommentsQueryResult extends RowDataPacket {
  id?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  score: number;
  userId: string;
  parentId: string;
}

export class Subcomment extends CommentType {
  parentId: string;
  user: User;

  constructor({
    id,
    content,
    createdAt,
    updatedAt,
    score,
    userId,
    parentId,
    user,
  }: SubcommentProps) {
    super(content, userId, id, score, createdAt, updatedAt);
    this.parentId = parentId;
    this.user = user;
    this._validate();
    this._validateParentId();
  }

  _validateParentId() {
    if (!this.parentId) {
      throw new ValidationError("ParentId is required!");
    }
  }

  async insert() {
    this.id = this.id ?? uuid();
    this._validate();
    this._validateParentId();

    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO `comments_subtable`(`id`, `content`, `userId`, `parentId`) VALUES (:id, :content, :userId, :parentId)",
      {
        id: this.id,
        content: this.content,
        userId: this.userId,
        parentId: this.parentId,
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
        "UPDATE `comments_subtable` SET `content`= :content, `updatedAt` = :updatedAt, `score` = :score WHERE `id` = :id",
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
        "DELETE FROM `comments_subtable` WHERE `id` = :id",
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
      throw new Error("Subcomment ID is required!");
    }

    const [[subcommentFound]] = await pool.execute<subcommentsQueryResult[]>(
      "SELECT * FROM `comments_subtable` WHERE `id` = :id",
      {
        id: id,
      }
    );
    if (!subcommentFound) return null;
    return new Subcomment({
      ...subcommentFound,
      user: await User.findById(subcommentFound.userId as string),
    });
  }

  static async findAll(queryParentId: string) {
    const [results] = await pool.execute<subcommentsQueryResult[]>(
      "SELECT * FROM `comments_subtable` WHERE `parentId` = :parentId ORDER by `createdAt` ASC;",
      {
        parentId: queryParentId,
      }
    );
    return Promise.all(
      results.map(
        async (result) =>
          new Subcomment({
            ...result,
            user: await User.findById(result.userId as string),
          })
      )
    );
  }
}
