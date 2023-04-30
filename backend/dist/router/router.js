"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var commentsController_1 = require("../controllers/commentsController");
var subcommentsController_1 = require("../controllers/subcommentsController");
var usersController_1 = require("../controllers/usersController");
var path_1 = __importDefault(require("path"));
var router = (0, express_1.Router)();
router.get("/", function (req, res) {
    return res.sendFile(path_1.default.join(__dirname, "..", "views", "index.html"));
});
router.route("/comments").get(commentsController_1.getAllComments).post(commentsController_1.postComment);
router
    .route("/comments/:id")
    .get(commentsController_1.getSingleComment)
    .put(commentsController_1.updateComment)
    .patch(commentsController_1.updateCommentScore)
    .delete(commentsController_1.deleteComment);
router.route("/subcomments").post(subcommentsController_1.postSubcomment);
router
    .route("/subcomments/:id")
    .put(subcommentsController_1.updateSubcomment)
    .patch(subcommentsController_1.updateSubcommentScore)
    .delete(subcommentsController_1.deleteSubcomment);
router.route("/users").get(usersController_1.getAllUsers);
router.route("/users/:userId").get(usersController_1.getSingleUser);
exports.default = router;
