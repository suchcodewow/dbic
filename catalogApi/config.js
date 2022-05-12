const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "password",
    database: "local_db",
  },
  listPerPage: 10,
};
module.exports = config;
