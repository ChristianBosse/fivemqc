const cors = require("cors");
const express = require("express");
const cfx = require("cfx-api");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/server", async (req, res) => {
    try {
        const server = await cfx.fetchServer("x3x33e");
        res.status(200).json(server);
    } catch (error) {
        res.status(404).json({
            message: "server seems to be down!",
            error: error,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
