const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    required: true,
    default:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/233.jpg",
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  bcrypt.hash(user.password, 10, function (err, hashedPassword) {
    if (err) return next(err);
    user.password = hashedPassword;
    next();
  });
});

userSchema.methods.comparePassword = function (stringPassword, done) {
  bcrypt.compare(stringPassword, this.password, function (err, isMatch) {
    if (err) return done(err);
    done(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
