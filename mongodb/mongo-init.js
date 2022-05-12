db = db.getSiblingDB("localdb");

db.createCollection("catalog");

db.catalog.insertMany([
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
