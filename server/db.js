const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  database: "restaurant_checklist",
  port: 5432,
});
// const pool = new Pool({
//   user: "postgres",
//   password: "Raktham.19821",
//   host: "https://postgres-checklist.cwtx0qlgb8sb.ap-southeast-1.rds.amazonaws.com",
//   database: "checklist",
//   port: 5432,
// });

module.exports = pool;
