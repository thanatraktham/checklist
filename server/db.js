const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});
// const pool = new Pool({
//   user: "postgres",
//   password: "Raktham.19821",
//   host: "https://postgres-checklist.cwtx0qlgb8sb.ap-southeast-1.rds.amazonaws.com",
//   database: "checklist",
//   port: 5432,
// });

module.exports = pool;
