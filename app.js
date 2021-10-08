const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./utils/db");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const {
  errorHandler,
  unknownEndPoint,
} = require("./utils/middlewares/basic-middlewares");
const loginRouter = require("./controllers/login");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

console.log(process.env.NODE_ENV);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(unknownEndPoint);
app.use(errorHandler);

module.exports = app;
