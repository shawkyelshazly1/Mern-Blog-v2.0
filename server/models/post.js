const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    cover: {
      type: String,
      required: true,
      default:
        "https://images.pexels.com/photos/9667784/pexels-photo-9667784.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
