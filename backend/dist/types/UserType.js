"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
var errors_1 = require("../lib/errors");
var UserType = /** @class */ (function () {
    function UserType(userId, username, image) {
        this.userId = userId;
        this.username = username;
        this.image = image;
    }
    UserType.prototype._validate = function () {
        if (this.username.trim().length < 3) {
            throw new errors_1.ValidationError("username should include at least 3 character!");
        }
        else if (this.username.trim().length > 25) {
            throw new errors_1.ValidationError("username should include at most 25 characters!");
        }
    };
    return UserType;
}());
exports.UserType = UserType;
