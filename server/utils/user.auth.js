const jwt = require("jsonwebtoken");

exports.verifyJWT = function (req, res, next) {
  const token = req.headers["authentication"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ success: false, error: "Invalid Token" });
      }
      req.token = token;
      next();
    });
  } else {
    return res.status(401).json({ success: false, error: "Invalid Token" });
  }
};
