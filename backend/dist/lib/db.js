"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var promise_1 = __importDefault(require("mysql2/promise"));
exports.pool = promise_1.default.createPool({
    host: process.env.HOST_ADDRESS,
    user: process.env.POOL_USER,
    password: process.env.POOL_PASSWORD,
    database: process.env.POOL_DATABASE,
    namedPlaceholders: true,
    decimalNumbers: true,
});
