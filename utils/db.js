const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

mongoose
  .connect(MONGO_URI)
  .then((res) => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err.name, err.message);
  });
