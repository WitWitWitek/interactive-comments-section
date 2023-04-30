import { pool } from "../lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { v4 as uuid } from "uuid";
import { ValidationError } from "../lib/errors";
import { UserType } from "../types/UserType";

interface UserProps {
  userId: string;
  username: string;
  png: string;
  webp: string;
}

interface usersQueryResult extends RowDataPacket {
  userId: string;
  username: string;
  png: string;
  webp: string;
}

export class User extends UserType {
  constructor({ userId, username, png, webp }: UserProps) {
    super(userId, username, {
      png: png,
      webp: webp,
    });
    this._validate();
  }

  async insert() {
    this.userId = this.userId ?? uuid();
    this._validate();

    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO `comments_table`(`id`, `username`) VALUES (:id, :username);",
      {
        id: this.userId,
        username: this.username,
      }
    );
    if (result.affectedRows) {
      return this.userId;
    }
  }

  async update() {
    if (!this.userId) {
      throw new ValidationError("username id required");
    }

    this._validate();

    const { affectedRows } = (
      await pool.execute<ResultSetHeader>(
        "UPDATE `comments_users` SET `username`= :username WHERE `id` = :id",
        {
          id: this.userId,
          username: this.username,
        }
      )
    )[0];
    if (affectedRows) {
      return true;
    }
  }

  async delete() {
    if (!this.userId) {
      throw new ValidationError("User id required");
    }

    const { affectedRows } = (
      await pool.execute<ResultSetHeader>(
        "DELETE FROM `comments_users` WHERE `id` = :id",
        {
          id: this.userId,
        }
      )
    )[0];
    if (affectedRows) {
      return true;
    }
  }

  static async findById(userId: string) {
    if (!userId) {
      throw new Error("User ID is required!");
    }

    const userFound = (
      await pool.execute<usersQueryResult[]>(
        "SELECT * FROM `comments_users` JOIN `comments_users-images` ON `comments_users`.`id` = `comments_users-images`.`userId` WHERE `comments_users`.`id` = :id",
        {
          id: userId,
        }
      )
    )[0][0];
    return new User(userFound);
  }

  static async findAll() {
    const [results] = await pool.execute<usersQueryResult[]>(
      "SELECT * FROM `comments_users` JOIN `comments_users-images` ON `comments_users`.`id` = `comments_users-images`.`userId`;"
    );
    return results.map((result) => new User(result));
  }
}
