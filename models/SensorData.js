const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SensorData = sequelize.define("sensor_data", {
  mq_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  aqi_value: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  timestamp_ms: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
}, {
  tableName: "sensor_data",
  timestamps: false,
});

module.exports = SensorData;
