const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    post: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "Post" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
