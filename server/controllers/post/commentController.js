const Comment = require("../../models/comment"),
  Post = require("../../models/post"),
  { commentSchema } = require("../../utils/joiSchema"),
  jwt = require("jsonwebtoken");

exports.getComments = (req, res, next) => {
  Comment.find({ post: req.params.post_id })
    .sort({ createdAt: "desc" })
    .populate("author", ["username", "avatar"])
    .exec((err, comments) => {
      if (err) return res.status(400).json({ success: false, error: err });
      return res.status(200).json({ success: true, comments: comments });
    });
};

exports.addComment = (req, res, next) => {
  commentSchema
    .validateAsync(req.body)
    .then((data) => {
      const { content, author, post } = data;
      Comment({ content, author, post }).save((err, comment) => {
        if (err) return res.status(400).json({ success: false, error: err });
        Comment.findOne(comment)
          .populate("author", ["username", "avatar"])
          .exec((err, comment) => {
            if (err)
              return res.status(400).json({ success: false, error: err });
            return res
              .status(200)
              .json({ sueccess: true, message: "Added Comment", comment });
          });
      });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ success: false, error: err.details[0].message });
    });
};

exports.deleteComment = (req, res, next) => {
  Comment.findById(req.params.comment_id).exec((err, comment) => {
    if (err) return res.status(400).json({ success: false, error: err });
    const user_id = jwt.decode(req.token).id;
    if (user_id == comment.author) {
      Post.findOneAndUpdate(
        { _id: comment.post },
        { $pull: { comments: comment._id } },
        (err, post) => {
          if (err) return res.status(400).json({ success: false, error: err });
          if (post) {
            comment.remove();
            return res
              .status(200)
              .json({ success: true, message: "Comment Deleted" });
          } else {
            return res.status(400).json({
              success: false,
              message: "something went wrong, please refresh adn try again",
            });
          }
        }
      );
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
  });
};
