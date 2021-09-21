const Blog = require("../models/blog");
const router = require("express").Router();

router.post("/", async (req, res, next) => {
  const data = req.body;
  try {
    const newBlog = new Blog({
      title: data.title,
      author: data.author,
      url: data.url,
      likes: data.likes,
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).end();
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
