const router = require("express").Router();
const { verifyJWT } = require("../utils/user.auth");
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/post/commentController");

router.get("/posts/:post_id/comments", getComments);
router.post("/posts/:post_id/comments", verifyJWT, addComment);
router.delete("/posts/:post_id/comments/:comment_id", verifyJWT, deleteComment);

module.exports = router;
