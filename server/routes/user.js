const router = require("express").Router(),
  { verifyJWT } = require("../utils/user.auth");

router.get("/users/:user_id", verifyJWT, (req, res) => {
  res.json({ message: "success" });
});

module.exports = router;
