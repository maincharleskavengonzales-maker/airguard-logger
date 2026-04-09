require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function insertData() {
  try {
    const co2 = Math.floor(Math.random() * 500 + 700);
    const humidity = (Math.random() * 10 + 80).toFixed(2);
    const temperature = (Math.random() * 5 + 23).toFixed(2);

    await pool.query(
      "INSERT INTO readings (co2, humidity, temperature) VALUES ($1, $2, $3)",
      [co2, humidity, temperature]
    );

    console.log("Inserted:", { co2, humidity, temperature });
  } catch (error) {
    console.error(error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

insertData();