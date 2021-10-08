const Blog = require("../models/blog");
const router = require("express").Router();
const { userExtractor } = require("../utils/middlewares/basic-middlewares");

router.post("/", userExtractor, async (req, res, next) => {
  const data = req.body;
  const user = req.user;
  console.log(user);
  try {
    const newBlog = new Blog({
      title: data.title,
      author: user._id,
      url: data.url,
      likes: data.likes,
    });
    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("author");
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", userExtractor, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).end();
    } else if (blog.author.toString() !== userId.toString()) {
      await blog.remove();
      res.status(204).end();
    } else {
      res.status(401).end();
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true, runValidators: true }
    );
    res.json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
