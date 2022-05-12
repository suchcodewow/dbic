const express = require("express");
const router = express.Router();
const catalog = require("../services/catalog");

/* GET catalog */
router.get("/", async function (req, res, next) {
  try {
    res.json(await catalog.getMultiple(req.query.page));
  } catch (err) {
    console.error("Error while getting the catalog ", err.message);
    next(err);
  }
});
/* POST catalogItem */
router.post("/", async function (req, res, next) {
  try {
    res.json(await catalog.create(req.body));
  } catch (err) {
    console.error("Error while creating catalog item", err.message);
    next(err);
  }
});
/* PUT catalogItem */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await catalog.update(req.params.id, req.body));
  } catch (err) {
    console.error("Error while updating catalog item", err.message);
    next(err);
  }
});
/* DELETE catalogItem */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await catalog.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting catalog item`, err.message);
    next(err);
  }
});
module.exports = router;
