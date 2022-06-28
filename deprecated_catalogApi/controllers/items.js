const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator/check");

const Item = require("../models/item");

exports.getItems = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Item.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Item.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((items) => {
      res.status(200).json({
        message: "Fetched items successfully.",
        items: items,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createItem = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const item = new Item({
    title: title,
  });
  item
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Item created successfully!",
        item: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getItem = (req, res, next) => {
  const itemId = req.params.itemId;
  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        const error = new Error("Could not find item.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Item fetched.", item: item });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateItem = (req, res, next) => {
  const itemId = req.params.itemId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No file picked.");
    error.statusCode = 422;
    throw error;
  }
  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        const error = new Error("Could not find item.");
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== item.imageUrl) {
        clearImage(item.imageUrl);
      }
      item.title = title;
      item.imageUrl = imageUrl;
      item.content = content;
      return item.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Item updated!", item: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteItem = (req, res, next) => {
  const itemId = req.params.itemId;
  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        const error = new Error("Could not find item.");
        error.statusCode = 404;
        throw error;
      }
      // Check logged in user
      clearImage(item.imageUrl);
      return Item.findByIdAndRemove(itemId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Deleted item." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
