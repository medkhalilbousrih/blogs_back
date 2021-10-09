const jwt = require("jsonwebtoken");
const logger = require("../logger/logger");
const User = require("../../models/user");
const { JWT_SECRET } = require("../config");

const unknownEndPoint = async (req, res, next) => {
  res.status(404).end();
};

const errorHandler = async (err, req, res, next) => {
  const { name, message } = err;
  if (name === "ValidationError") {
    res.status(400).end();
  } else if (name === "JsonWebTokenError" || name === "TokenExpiredError") {
    res.status(401).end();
  } else if (message.startsWith("E11000")) {
    res.status(400).end();
  } else {
    res.status(500).end();
  }
  logger.error(err);
};

const userExtractor = async (req, res, next) => {
  const auth = req.get("Authorization");
  console.log(auth);
  if (!(auth && auth.toLowerCase().startsWith("bearer "))) {
    return res.status(401).end();
  }
  const token = auth.split(" ")[1];
  const { id } = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(id);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).end();
  }
};

module.exports = { unknownEndPoint, errorHandler, userExtractor };
