import { RequestHandler } from "express";
import { Comment } from "../models/comment";
import { User } from "../models/user";
import DOMPurify from "isomorphic-dompurify";

export const getAllComments: RequestHandler = async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
    return res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

export const getSingleComment: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const commentFound = await Comment.findById(id);
    if (!commentFound) {
      return res.status(404).json({ message: "Comment doesn't exist!" });
    }
    res.status(200).json(commentFound);
  } catch (err) {
    next(err);
  }
};

export const postComment: RequestHandler = async (req, res, next) => {
  const { content, userId } = req.body;
  if (!content || typeof content !== "string") {
    return res.status(400).json({ message: "Content field is required!" });
  }
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ message: "UserId field is required!" });
  }
  const allComments = await Comment.findAll();
  if (allComments.length > 20) {
    return res.status(403).json({
      message:
        "Inserting more than 20 comments into the database is not allowed.",
    });
  }
  try {
    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(404).json({ message: "User doesnt exist!" });
    }
    const newComment = new Comment({
      content: DOMPurify.sanitize(content),
      userId: userFound.userId,
      user: userFound,
    });
    const insertedCommentId = await newComment.insert();
    res
      .status(201)
      .json({ message: `Comment with ID ${insertedCommentId} created.` });
  } catch (err) {
    next(err);
  }
};

export const updateComment: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { updatedContent } = req.body;
  if (!updatedContent) {
    return res.status(400).json({ message: "New content required!" });
  }
  const commentFound = await Comment.findById(id);
  if (!commentFound) {
    return res.status(404).json({ message: "Comment doesn't exist!" });
  }
  try {
    commentFound.content = DOMPurify.sanitize(updatedContent);
    await commentFound.update();
    res
      .status(200)
      .json({ message: `Comment with ID: ${commentFound.id} updated.` });
  } catch (err) {
    next(err);
  }
};

export const updateCommentScore: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { updatedScore } = req.body;
  if (!updatedScore) {
    return res.status(400).json({ message: "New content required!" });
  }
  if (isNaN(Number(updatedScore))) {
    return res.status(400).json({ message: "Score must be a type of number!" });
  }
  const commentFound = await Comment.findById(id);
  if (!commentFound) {
    return res.status(404).json({ message: "Comment doesn't exist!" });
  }
  try {
    commentFound.score = Number(updatedScore);
    await commentFound.update();
    res.status(200).json({
      message: `Score of comment with ID: ${commentFound.id} updated.`,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteComment: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const commentFound = await Comment.findById(id);
  if (!commentFound) {
    return res.status(404).json({ message: "Comment doesn't exist!" });
  }
  try {
    await commentFound.delete();
    res
      .status(200)
      .json({ message: `Comment with ID: ${commentFound.id} deleted.` });
  } catch (err) {
    next(err);
  }
};
