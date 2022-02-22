const router = require("express").Router(),
  {
    getPosts,
    addPost,
    getPost,
  } = require("../controllers/post/postController"),
  { verifyJWT } = require("../utils/user.auth");

router.get("/posts", getPosts);
router.get("/posts/:post_id", getPost);
router.post("/posts", verifyJWT, addPost);

module.exports = router;
