const express = require("express");
const cors = require("cors");
const os = require('os');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT || parseInt(process.env.API_PORT);
const app = express();
app.use(express.json());
app.use(cors());

const systemInfo = {
  operatingSystem: os.platform(),
  processor: os.cpus()[0].model,
  totalMemory: os.totalmem() / (1024 * 1024 * 1024), // Convert bytes to gigabytes
  freeMemory: os.freemem() / (1024 * 1024 * 1024), // Convert bytes to gigabytes
};
console.log(systemInfo);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed. Server not started");
    console.log(err);
  });