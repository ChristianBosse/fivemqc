const router = require("express").Router();
const cfx = require("cfx-api");
const pool = require("../../db/database");

router.get("/status", async (req, res) => {
    try {
        await pool.query("SELECT server_id FROM server_data");
        const server = await cfx.fetchServer("7d7mjv");
        res.status(200).json({ message: "Server is online" });
    } catch (error) {
        res.status(404).json({ message: "Server is offline", error: error });
    }
});

module.exports = router;
