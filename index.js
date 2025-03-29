const express = require("express");
const os = require("os");
const cors = require("cors");
const { Client } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

const client = new Client({
  host: process.env.DATABASE_PG_HOST,
  user: process.env.DATABASE_PG_USER,
  port: process.env.DATABASE_PG_PORT,
  password: process.env.DATABASE_PG_PASSWORD,
  database: process.env.DATABASE_PG_DB,
});

client.connect((err) => {
  if (err) {
    console.error("Connection error: ", err.stack);
  } else {
    console.log("psql server successfully connected");
  }
});

client.query(`select * from activity_log`, (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.error(err.message);
  }

  client.end;
});

app.get("/user-info", async (req, res) => {
  try {
    res.json({
      arch: os.arch(),
      platform: os.platform(),
      user: os.userInfo(),
      homedir: os.homedir(),
      hostname: os.hostname(),
      machine: os.machine(),
      endianness: os.endianness(),
    });
  } catch (error) {
    res.status(500).json({ error: "Error on get data" });

    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server run port-${port}`);
});
