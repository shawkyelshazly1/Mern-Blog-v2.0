const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  path = require("path");

require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Register API Routes
const userAuthRouter = require("./routes/auth.user"),
  userRouter = require("./routes/user.js"),
  postRouter = require("./routes/post"),
  commentRouter = require("./routes/comment");

app.use("/api", userAuthRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log(`MongoDB Connected Successfully!`);
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server up & running port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
