const express = require("express");
const cors = require("cors");
require("./utils/db");

const blogsRouter = require("./controllers/blogs");
const {
  errorHandler,
  unknownEndPoint,
} = require("./utils/middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(process.env.NODE_ENV);

app.use("/api/blogs", blogsRouter);

app.use(unknownEndPoint);
app.use(errorHandler);

module.exports = app;
