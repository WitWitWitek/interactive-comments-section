// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import path from "path";
import express from "express";
import { errorHandler } from "./lib/errors";
import router from "./router/router";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(3500, () => console.log("server listening on port 3500"));
