"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateCommentScore = exports.updateComment = exports.postComment = exports.getSingleComment = exports.getAllComments = void 0;
var comment_1 = require("../models/comment");
var user_1 = require("../models/user");
var isomorphic_dompurify_1 = __importDefault(require("isomorphic-dompurify"));
var getAllComments = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var comments, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, comment_1.Comment.findAll()];
            case 1:
                comments = _a.sent();
                return [2 /*return*/, res.status(200).json(comments)];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllComments = getAllComments;
var getSingleComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, commentFound, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, comment_1.Comment.findById(id)];
            case 2:
                commentFound = _a.sent();
                if (!commentFound) {
                    return [2 /*return*/, res.status(404).json({ message: "Comment doesn't exist!" })];
                }
                res.status(200).json(commentFound);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSingleComment = getSingleComment;
var postComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, content, userId, allComments, userFound, newComment, insertedCommentId, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, content = _a.content, userId = _a.userId;
                if (!content || typeof content !== "string") {
                    return [2 /*return*/, res.status(400).json({ message: "Content field is required!" })];
                }
                if (!userId || typeof userId !== "string") {
                    return [2 /*return*/, res.status(400).json({ message: "UserId field is required!" })];
                }
                return [4 /*yield*/, comment_1.Comment.findAll()];
            case 1:
                allComments = _b.sent();
                if (allComments.length > 20) {
                    return [2 /*return*/, res.status(403).json({
                            message: "Inserting more than 20 comments into the database is not allowed.",
                        })];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                return [4 /*yield*/, user_1.User.findById(userId)];
            case 3:
                userFound = _b.sent();
                if (!userFound) {
                    return [2 /*return*/, res.status(404).json({ message: "User doesnt exist!" })];
                }
                newComment = new comment_1.Comment({
                    content: isomorphic_dompurify_1.default.sanitize(content),
                    userId: userFound.userId,
                    user: userFound,
                });
                return [4 /*yield*/, newComment.insert()];
            case 4:
                insertedCommentId = _b.sent();
                res
                    .status(201)
                    .json({ message: "Comment with ID ".concat(insertedCommentId, " created.") });
                return [3 /*break*/, 6];
            case 5:
                err_3 = _b.sent();
                next(err_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postComment = postComment;
var updateComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedContent, commentFound, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                updatedContent = req.body.updatedContent;
                if (!updatedContent) {
                    return [2 /*return*/, res.status(400).json({ message: "New content required!" })];
                }
                return [4 /*yield*/, comment_1.Comment.findById(id)];
            case 1:
                commentFound = _a.sent();
                if (!commentFound) {
                    return [2 /*return*/, res.status(404).json({ message: "Comment doesn't exist!" })];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                commentFound.content = isomorphic_dompurify_1.default.sanitize(updatedContent);
                return [4 /*yield*/, commentFound.update()];
            case 3:
                _a.sent();
                res
                    .status(200)
                    .json({ message: "Comment with ID: ".concat(commentFound.id, " updated.") });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateComment = updateComment;
var updateCommentScore = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedScore, commentFound, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                updatedScore = req.body.updatedScore;
                if (!updatedScore) {
                    return [2 /*return*/, res.status(400).json({ message: "New content required!" })];
                }
                if (isNaN(Number(updatedScore))) {
                    return [2 /*return*/, res.status(400).json({ message: "Score must be a type of number!" })];
                }
                return [4 /*yield*/, comment_1.Comment.findById(id)];
            case 1:
                commentFound = _a.sent();
                if (!commentFound) {
                    return [2 /*return*/, res.status(404).json({ message: "Comment doesn't exist!" })];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                commentFound.score = Number(updatedScore);
                return [4 /*yield*/, commentFound.update()];
            case 3:
                _a.sent();
                res.status(200).json({
                    message: "Score of comment with ID: ".concat(commentFound.id, " updated."),
                });
                return [3 /*break*/, 5];
            case 4:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateCommentScore = updateCommentScore;
var deleteComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, commentFound, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, comment_1.Comment.findById(id)];
            case 1:
                commentFound = _a.sent();
                if (!commentFound) {
                    return [2 /*return*/, res.status(404).json({ message: "Comment doesn't exist!" })];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, commentFound.delete()];
            case 3:
                _a.sent();
                res
                    .status(200)
                    .json({ message: "Comment with ID: ".concat(commentFound.id, " deleted.") });
                return [3 /*break*/, 5];
            case 4:
                err_6 = _a.sent();
                next(err_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteComment = deleteComment;
