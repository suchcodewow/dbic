const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const router = express.Router();

// Database connection
const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
const app = express();

// Define schema
const Schema = mongoose.Schema;

const CustomQuoteSchema = new Schema({
  a_string: String,
  a_date: Date,
});

// Compile model from schema
const CustomQuote = mongoose.model("CustomQUote", CustomQuoteSchema);

//Post Method
router.post("/post", (req, res) => {
  res.send("Post API");
});

//Get all Method
router.get("/getAll", (req, res) => {
  res.send("Get All API");
});

//Get by ID Method
router.get("/getOne/:id", (req, res) => {
  res.send("Get by ID API");
});

//Update by ID Method
router.patch("/update/:id", (req, res) => {
  res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", (req, res) => {
  res.send("Delete by ID API");
});

app.use(express.json());
app.listen(3000, () => {
  console.log("The server is active on port 3000");
});
console.log(dbUrl);
