"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var errors_1 = require("./lib/errors");
var router_1 = __importDefault(require("./router/router"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(router_1.default);
app.all("*", function (req, res) {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path_1.default.join(__dirname, "views", "404.html"));
    }
    else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    }
    else {
        res.send("404 Not Found");
    }
});
app.use(errors_1.errorHandler);
app.listen(3500, function () { return console.log("server listening on port 3500"); });
