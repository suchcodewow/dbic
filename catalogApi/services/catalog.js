const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * from catalog LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(catalogItem) {
  console.log(catalogItem);
  const result = await db.query(
    `INSERT INTO catalog (title) VALUES ("${catalogItem.title}")`
  );

  let message = "Error in creating catalog item";

  if (result.affectedRows) {
    message = "catalog item created successfully";
  }

  return { message };
}

async function update(id, catalogItem) {
  const result = await db.query(
    `UPDATE catalog SET title="${catalogItem.title}" WHERE id=${id}`
  );

  let message = "Error in updating catalog item";

  if (result.affectedRows) {
    message = "catalog item updated successfully";
  }

  return { message };
}
async function remove(id) {
  const result = await db.query(`DELETE FROM catalog WHERE id=${id}`);

  let message = "Error in deleting catalog item";

  if (result.affectedRows) {
    message = "catalog item deleted successfully";
  }

  return { message };
}
module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
