const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const port = 3666;

//API setup
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Database connection
const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

// Define quote schema
const Schema = mongoose.Schema;

const CustomQuoteSchema = new Schema({
  Name: String,
});
const CustomQuote = mongoose.model("CustomQUote", CustomQuoteSchema);

// API: Create
app.post("/", async (req, res) => {
  const newQuote = new CustomQuote({ ...req.body });
  const insertedQuote = await newQuote.save();
  return res.status(201).json(insertedQuote);
});

// API: Read
app.get("/", async (req, res) => {
  const allQuotes = await CustomQuote.find();
  return res.status(200).json(allQuotes);
});

// API: Update
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  await CustomQuote.updateOne({ _id: id }, req.body);
  console.log(req.body);
  const updatedQuote = await CustomQuote.findById(id);
  return res.status(200).json(updatedQuote);
});

// API: Delete
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedQuote = await CustomQuote.findByIdAndDelete(id);
  return res.status(200).json(deletedQuote);
});

// API: Get One
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const quote = await CustomQuote.findById(id);
  return res.status(200).json(quote);
});

//Start application
app.listen(port, () => {
  console.log("The server is active on port", port);
});
