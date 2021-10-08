const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  try {
    const passwordVerif = await bcrypt.compare(password, user.password);
    if (!(user && passwordVerif)) {
      return res.status(401).end();
    }
    const tokenData = {
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
