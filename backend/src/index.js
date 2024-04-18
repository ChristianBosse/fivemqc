// Import Environment Variables
require("dotenv").config();
// Import needed modules
const cors = require("cors");
const express = require("express");

// Setting EDT time zone
process.env.TZ = "America/Montreal";

// Import Cron Job
const {
    serverDataSchedule,
    peakDailyPlayers,
} = require("../cron/ServerDataCron");
const serverClientCron = require("../cron/ServerClientCron");

// Start Cron Job
serverDataSchedule();
serverClientCron();
peakDailyPlayers();

// Import Port
const PORT = process.env.PORT;

// Create Express App
const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const serverStatus = require("../controllers/ServerStatus/ServerStatus");
const serverInfo = require("../controllers/ServerInfo/ServerInfo");
const cfxStatus = require("../controllers/ServerStatus/CfxStatus");
const addServer = require("../controllers/AddServer/AddServer");

//Are we in development mode?
const isDev = true;
let apiURL = "";
if (isDev) {
    apiURL = "/api";
} else {
    apiURL = "/";
}

// Use Routes
app.use(`${apiURL}`, serverStatus);

app.use(`${apiURL}`, serverInfo);

app.use(`${apiURL}`, cfxStatus);

app.use(`${apiURL}`, addServer);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
