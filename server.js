const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URL || "mongodb://budget1:budget1@ds143707.mlab.com:43707/heroku_v88n2dg9"

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});