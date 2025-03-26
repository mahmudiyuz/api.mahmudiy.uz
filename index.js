const express = require("express");
const cors = require("cors");
const pgp = require("pg-promise")();

require("dotenv").config();

const app = express();
const db = pgp(process.env.DATABASE_URL);

// middlewares
app.use(cors());
app.use(express.json());

const port = 4500;

// API endpoint
app.get("/user-info", async (req, res) => {
  try {
    const data = await db.one("SELECT * FROM activity_log LIMIT 1");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ma'lumot olishda xatolik" });
  }
});

// server locale connection
app.listen(port, () => {
  console.log(`Server ${port}-portda ishlamoqda`);
});
