require("dotenv").config({ quiet: true });
const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function insertData() {
  try {
    console.log("Inserting data...");

    const sensor1 = {
      sensor_id: "sensor_1",
      co2: 850,
      humidity: 89.6,
      temperature: 23.2
    };

    const sensor2 = {
      sensor_id: "sensor_2",
      co2: 920,
      humidity: 85.1,
      temperature: 24.5
    };

    await pool.query(
      "INSERT INTO readings (co2, humidity, temperature, sensor_id) VALUES ($1, $2, $3, $4)",
      [sensor1.co2, sensor1.humidity, sensor1.temperature, sensor1.sensor_id]
    );

    await pool.query(
      "INSERT INTO readings (co2, humidity, temperature, sensor_id) VALUES ($1, $2, $3, $4)",
      [sensor2.co2, sensor2.humidity, sensor2.temperature, sensor2.sensor_id]
    );

    console.log("Both sensors inserted!");
  } catch (error) {
    console.error("Insert failed:");
    console.error(error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

insertData();