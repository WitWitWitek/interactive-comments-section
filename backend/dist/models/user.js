"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var db_1 = require("../lib/db");
var uuid_1 = require("uuid");
var errors_1 = require("../lib/errors");
var UserType_1 = require("../types/UserType");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(_a) {
        var userId = _a.userId, username = _a.username, png = _a.png, webp = _a.webp;
        var _this = _super.call(this, userId, username, {
            png: png,
            webp: webp,
        }) || this;
        _this._validate();
        return _this;
    }
    User.prototype.insert = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.userId = (_a = this.userId) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)();
                        this._validate();
                        return [4 /*yield*/, db_1.pool.execute("INSERT INTO `comments_table`(`id`, `username`) VALUES (:id, :username);", {
                                id: this.userId,
                                username: this.username,
                            })];
                    case 1:
                        result = (_b.sent())[0];
                        if (result.affectedRows) {
                            return [2 /*return*/, this.userId];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var affectedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userId) {
                            throw new errors_1.ValidationError("username id required");
                        }
                        this._validate();
                        return [4 /*yield*/, db_1.pool.execute("UPDATE `comments_users` SET `username`= :username WHERE `id` = :id", {
                                id: this.userId,
                                username: this.username,
                            })];
                    case 1:
                        affectedRows = (_a.sent())[0].affectedRows;
                        if (affectedRows) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var affectedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userId) {
                            throw new errors_1.ValidationError("User id required");
                        }
                        return [4 /*yield*/, db_1.pool.execute("DELETE FROM `comments_users` WHERE `id` = :id", {
                                id: this.userId,
                            })];
                    case 1:
                        affectedRows = (_a.sent())[0].affectedRows;
                        if (affectedRows) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    User.findById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userFound;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userId) {
                            throw new Error("User ID is required!");
                        }
                        return [4 /*yield*/, db_1.pool.execute("SELECT * FROM `comments_users` JOIN `comments_users-images` ON `comments_users`.`id` = `comments_users-images`.`userId` WHERE `comments_users`.`id` = :id", {
                                id: userId,
                            })];
                    case 1:
                        userFound = (_a.sent())[0][0];
                        return [2 /*return*/, new User(userFound)];
                }
            });
        });
    };
    User.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.pool.execute("SELECT * FROM `comments_users` JOIN `comments_users-images` ON `comments_users`.`id` = `comments_users-images`.`userId`;")];
                    case 1:
                        results = (_a.sent())[0];
                        return [2 /*return*/, results.map(function (result) { return new User(result); })];
                }
            });
        });
    };
    return User;
}(UserType_1.UserType));
exports.User = User;
