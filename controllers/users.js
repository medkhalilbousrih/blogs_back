const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/user");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("blogs", { author: 0 });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const data = req.body;
  if (!(data.password && data.password.length > 5)) {
    return res.status(400).end();
  }
  try {
    const password = await bcrypt.hash(data.password, 10);
    const user = new User({
      username: data.username,
      name: data.name,
      password,
    });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
