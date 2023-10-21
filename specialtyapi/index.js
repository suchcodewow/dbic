const express = require("express");

const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("The server is active on port 3000");
});
