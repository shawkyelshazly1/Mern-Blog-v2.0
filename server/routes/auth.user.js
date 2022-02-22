const router = require("express").Router(),
  {
    loginUser,
    registerUser,
    getUser,
  } = require("../controllers/user/authController"),
  { verifyJWT } = require("../utils/user.auth.js");

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.get("/users/auth", verifyJWT, getUser);

module.exports = router;
