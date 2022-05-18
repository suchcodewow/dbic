const express = require("express");
const { body } = require("express-validator/check");

const itemController = require("../controllers/items");

const router = express.Router();

// GET /feed/Items
router.get("/", itemController.getItems);

// Item /feed/Item
router.post(
  "/item",
  [body("title").trim().isLength({ min: 1 })],
  itemController.createItem
);

router.get("/item/:itemId", itemController.getItem);

router.put(
  "/item/:itemId",
  [body("title").trim().isLength({ min: 1 })],
  itemController.updateItem
);

router.delete("/item/:itemId", itemController.deleteItem);

module.exports = router;
