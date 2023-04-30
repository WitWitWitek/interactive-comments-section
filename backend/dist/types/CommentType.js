"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentType = void 0;
var errors_1 = require("../lib/errors");
var CommentType = /** @class */ (function () {
    function CommentType(content, userId, id, score, createdAt, updatedAt) {
        this.content = content;
        this.userId = userId;
        this.id = id;
        this.score = score;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    CommentType.prototype._validate = function () {
        if (this.content.trim().length < 5) {
            throw new errors_1.ValidationError("Comment should include at least 1 character!");
        }
        else if (this.content.trim().length > 255) {
            throw new errors_1.ValidationError("Comment should include at most 255 characters!");
        }
        if (!this.userId) {
            throw new errors_1.ValidationError("UserId is required!");
        }
    };
    return CommentType;
}());
exports.CommentType = CommentType;
