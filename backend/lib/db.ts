import mysql2 from "mysql2/promise";

export const pool = mysql2.createPool({
  host: process.env.HOST_ADDRESS,
  user: process.env.POOL_USER,
  password: process.env.POOL_PASSWORD,
  database: process.env.POOL_DATABASE,
  namedPlaceholders: true,
  decimalNumbers: true,
});
