const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
const app = express();

app.use(express.json());
app.listen(3000, () => {
  console.log("The server is active on port 3000");
});
console.log(dbUrl);
