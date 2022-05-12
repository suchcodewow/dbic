const express = require("express");
const { body } = require("express-validator/check");

const catalogController = require("../controllers/catalog");

const router = express.Router();

// GET /feed/Items
router.get("/items", catalogController.getItems);

// Item /feed/Item
router.post(
  "/item",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  catalogController.createItem
);

router.get("/item/:itemId", catalogController.getItem);

router.put(
  "/item/:itemId",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  catalogController.updateItem
);

router.delete("/item/:itemId", catalogController.deleteItem);

module.exports = router;
