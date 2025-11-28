const express = require("express");
const router = express.Router();
const SensorData = require("../models/SensorData");

// SIMPAN data sensor
router.post("/data", async (req, res) => {
  try {
    const { mq, aqi, timestamp } = req.body;
    await SensorData.create({
      mq_value: mq,
      aqi_value: aqi,
      timestamp_ms: timestamp
    });

    res.json({ message: "Data saved!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Insert error" });
  }
});

// AMBIL data untuk grafik
router.get("/data", async (req, res) => {
  try {
    const data = await SensorData.findAll({
      order: [["id", "DESC"]],
      limit: 100
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetch error" });
  }
});

module.exports = router;
