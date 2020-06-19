const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let MONGODB_URI = process.env.MONGODB_URI ||  "mongodb://user:liuyiling123CLARE@ds117691.mlab.com:17691/heroku_gcqvzdck";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(express.static("public"));

// routes
require("./routes/api.js")(app);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});