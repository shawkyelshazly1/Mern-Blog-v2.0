const { postSchema } = require("../../utils/joiSchema"),
  Post = require("../../models/post");

exports.getPosts = (req, res, next) => {
  Post.find({})
    .limit(50)
    .sort({ createdAt: "desc" })
    .populate("author", ["username", "avatar"])
    .exec((err, posts) => {
      if (err) return res.status(400).json({ success: false, error: err });
      return res.json({ success: true, posts });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.post_id)
    .populate("author", ["username", "avatar"])
    .exec((err, post) => {
      if (err) return res.status(400).json({ success: false, error: err });
      return res.status(200).json({ success: true, post });
    });
};

exports.addPost = (req, res, next) => {
  postSchema
    .validateAsync(req.body)
    .then((data) => {
      const { title, content, author } = data;
      Post({ title, content, author }).save((err, post) => {
        if (err) return res.status(400).json({ success: false, error: err });
        return res.status(200).json({
          success: true,
          message: "Post Added ",
          post,
        });
      });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ success: false, error: err.details[0].message });
    });
};
