require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function insertData() {
  try {
    // SENSOR 1
    const sensor1 = {
      id: "sensor_1",
      co2: 850,
      humidity: 89.6,
      temperature: 23.2
    };

    // SENSOR 2
    const sensor2 = {
      id: "sensor_2",
      co2: 920,
      humidity: 85.1,
      temperature: 24.5
    };

    console.log("Inserting data...");

    // Insert sensor 1
    await pool.query(
      "INSERT INTO readings (sensor_id, co2, humidity, temperature) VALUES ($1, $2, $3, $4)",
      [sensor1.id, sensor1.co2, sensor1.humidity, sensor1.temperature]
    );

    // Insert sensor 2
    await pool.query(
      "INSERT INTO readings (sensor_id, co2, humidity, temperature) VALUES ($1, $2, $3, $4)",
      [sensor2.id, sensor2.co2, sensor2.humidity, sensor2.temperature]
    );

    console.log("Both sensors inserted!");
  } catch (error) {
    console.error(error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

insertData();