//db.js

const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // the number of connections will node hold open to our database
  password: "password",
  user: "root",
  database: "local_db",
  host: "localhost",
  port: "3306",
});

let db = {};
db.getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM Employee ", (error, employees) => {
      if (error) {
        return reject(error);
      }
      return resolve(employees);
    });
  });
};
module.exports = db;
