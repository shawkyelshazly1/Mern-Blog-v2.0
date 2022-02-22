const { faker } = require("@faker-js/faker"),
  mongoose = require("mongoose"),
  User = require("./models/user"),
  Post = require("./models/post"),
  bcrypt = require("bcrypt");

require("dotenv").config();

const users = [];

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log(`MongoDB Connected`);
  })
  .catch((err) => {
    console.error(`Somethind wrong wnet with MongoDB`);
  });

for (let i = 0; i < 10; i++) {
  let user = new User({
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync("123456", 10),
    avatar: faker.image.avatar(),
  });

  users.push(user);
}
User.insertMany(users);
console.log(`Added Users!`);

const posts = [];

for (let i = 0; i < 100; i++) {
  let post = new Post({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    cover: faker.image.imageUrl(),
    author: users[Math.floor(Math.random() * users.length)]._id.toString(),
  });
  posts.push(post);
}
console.log(posts);

Post.insertMany(posts);
console.log(`Posts Added!`);
