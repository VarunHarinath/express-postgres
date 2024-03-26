import fs from "fs";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "postgres-test.cvu8us06ubtw.ap-south-1.rds.amazonaws.com",
  database: "students",
  password: "123456789",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync("./env/postgres-rds-kp.pem").toString(),
  },
});

async function testDatabaseConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(
      "Connected to the database successfully. Server time is:",
      res.rows[0].now
    );
  } catch (err) {
    console.log("Connection to the database failed:", err);
  }
}

testDatabaseConnection();

export default pool;
