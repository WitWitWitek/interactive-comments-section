import { Router } from "express";
import {
  deleteComment,
  getAllComments,
  getSingleComment,
  postComment,
  updateComment,
  updateCommentScore,
} from "../controllers/commentsController";
import {
  deleteSubcomment,
  postSubcomment,
  updateSubcomment,
  updateSubcommentScore,
} from "../controllers/subcommentsController";
import { getAllUsers, getSingleUser } from "../controllers/usersController";
import path from "path";

const router = Router();

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "views", "index.html"))
);

router.route("/comments").get(getAllComments).post(postComment);

router
  .route("/comments/:id")
  .get(getSingleComment)
  .put(updateComment)
  .patch(updateCommentScore)
  .delete(deleteComment);

router.route("/subcomments").post(postSubcomment);
router
  .route("/subcomments/:id")
  .put(updateSubcomment)
  .patch(updateSubcommentScore)
  .delete(deleteSubcomment);

router.route("/users").get(getAllUsers);
router.route("/users/:userId").get(getSingleUser);

export default router;
