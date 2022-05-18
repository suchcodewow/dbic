db = db.getSiblingDB("catalog");

db.createCollection("Items");

db.Items.insertMany([
  {
    title: "duck",
  },
  {
    title: "toy",
  },
  {
    title: "railroad",
  },
]);
