import { RequestHandler } from "express";
import { User } from "../models/user";
import { Subcomment } from "../models/subcomment";
import DOMPurify from "isomorphic-dompurify";
import { Comment } from "../models/comment";

export const postSubcomment: RequestHandler = async (req, res, next) => {
  const { content, userId, parentId } = req.body;
  if (!content || typeof content !== "string") {
    return res.status(400).json({ message: "Content field is required!" });
  }
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ message: "UserId field is required!" });
  }
  const allSubcomments = await Subcomment.findAll(parentId);
  if (allSubcomments.length > 30) {
    return res.status(403).json({
      message:
        "Inserting more than 30 subcomments into the single thread is not allowed.",
    });
  }
  try {
    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(404).json({ message: "User doesnt exist!" });
    }
    const parentFound = await Comment.findById(parentId);
    if (!parentFound) {
      return res.status(404).json({ message: "Parent comment doesnt exist!" });
    }
    const newSubcomment = new Subcomment({
      content: DOMPurify.sanitize(content),
      userId,
      parentId,
      user: userFound,
    });
    const insertedSubcommentId = await newSubcomment.insert();
    res.status(201).json({
      message: `Subcomment with ID ${insertedSubcommentId}  created.`,
    });
  } catch (err) {
    next(err);
  }
};

export const updateSubcomment: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { updatedContent } = req.body;
  if (!updatedContent) {
    return res.status(400).json({ message: "New content required!" });
  }
  const subcommentFound = await Subcomment.findById(id);
  if (!subcommentFound) {
    return res.status(404).json({ message: "Subcomment doesn't exist!" });
  }
  try {
    subcommentFound.content = DOMPurify.sanitize(updatedContent);
    await subcommentFound.update();
    res
      .status(200)
      .json({ message: `Subcomment with ID: ${subcommentFound.id} updated.` });
  } catch (err) {
    next(err);
  }
};

export const updateSubcommentScore: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { updatedScore } = req.body;
  if (!updatedScore) {
    return res.status(400).json({ message: "New content required!" });
  }
  if (isNaN(Number(updatedScore))) {
    return res.status(400).json({ message: "Score must be a type of number!" });
  }
  const subcommentFound = await Subcomment.findById(id);
  if (!subcommentFound) {
    return res.status(404).json({ message: "Subcomment doesn't exist!" });
  }
  try {
    subcommentFound.score = Number(updatedScore);
    await subcommentFound.update();
    res.status(200).json({
      message: `Score of subcomment with ID: ${subcommentFound.id} updated.`,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSubcomment: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const subcommentFound = await Subcomment.findById(id);
  if (!subcommentFound) {
    return res.status(404).json({ message: "Comment doesn't exist!" });
  }
  try {
    await subcommentFound.delete();
    res
      .status(200)
      .json({ message: `Comment with ID: ${subcommentFound.id} deleted.` });
  } catch (err) {
    next(err);
  }
};
