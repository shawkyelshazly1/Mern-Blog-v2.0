const { loginSchema, registerSchema } = require("../../utils/joiSchema"),
  Joi = require("joi"),
  User = require("../../models/user"),
  jwt = require("jsonwebtoken");

/**
 *
 * Login User function
 * @returns json object with status & result
 */

exports.getUser = (req, res, next) => {
  const token = req.headers["authentication"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ success: false, error: "Invalid Token" });
      }

      User.findById(payload.id, (err, user) => {
        if (!user) {
          return res.status(401).json({ success: false, error: err });
        } else {
          return res.json({
            success: true,
            id: user._id,
            avatar: user.avatar,
          });
        }
      });
    });
  } else {
    return res.status(401).json({ success: false, error: "Invalid Token" });
  }
};

exports.loginUser = (req, res, next) => {
  //Validating req body against loginschema
  loginSchema
    .validateAsync(req.body)
    .then((data) => {
      // Checking if user in DB
      User.findOne({ email: data.email }, (err, user) => {
        if (err) return res.status(400).json({ success: false, error: err });
        if (user) {
          //If user found comparing password against hashed one in DB
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch) {
              const token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );
              return res.json({
                success: true,
                message: "Logged In",
                token,
                avatar: user.avatar,
              });
            } else {
              return res.status(400).json({
                success: false,
                error: "Wrong email or password",
              });
            }
          });
        } else {
          return res.status(400).json({
            success: false,
            error: "Wrong email or password",
          });
        }
      });
    })
    .catch((err) => {
      //Returning validation error message if exist

      return res
        .status(400)
        .json({ success: false, error: err.details[0].message });
    });
};

/**
 *
 * Register User function
 * validating input against predefined schema using Joi
 * Checking if user already registered in DB
 * Saving User to DB
 * @returns json object with status & result
 */
exports.registerUser = (req, res, next) => {
  //Validating data based on Joi registerSchema predefined
  registerSchema
    .validateAsync(req.body)
    .then((data) => {
      const { firstname, lastname, username, email, password } = data;

      //Checking if user already registered
      User.findOne({ $or: [{ email }, { username }] }, (err, user) => {
        if (err) return res.status(400).json({ success: false, error: err });
        if (user) {
          return res.status(400).json({
            success: false,
            error: "Email or Username Already taken",
          });
        } else {
          User({
            firstname,
            lastname,
            username,
            email,
            password,
          }).save((err, user) => {
            if (err)
              return res.status(400).json({ success: false, error: error });
            return res.status(200).json({
              success: true,
              message: "User Registered Successfully",
            });
          });
        }
      });

      //saving user to DB if new
    })
    .catch((err) => {
      //Returning validation error message if exist

      return res
        .status(400)
        .json({ success: false, error: err.details[0].message });
    });
};
