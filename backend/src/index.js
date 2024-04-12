// Import Environment Variables
require("dotenv").config();
// Import needed modules
const cors = require("cors");
const express = require("express");

// Import Cron Job
const serverDataSchedule = require("../cron/ServerDataCron");
const serverClientCron = require("../cron/ServerClientCron");

// Start Cron Job
serverDataSchedule();
serverClientCron();

// Import Port
const PORT = process.env.PORT;

// Create Express App
const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const serverStatus = require("../controllers/ServerStatus/ServerStatus");
const serverInfo = require("../controllers/ServerInfo/ServerInfo");

// Use Routes
app.use("/api", serverStatus);

app.use("/api", serverInfo);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});