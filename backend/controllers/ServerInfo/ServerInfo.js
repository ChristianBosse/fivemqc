const router = require("express").Router();
const cfx = require("cfx-api");
const pool = require("../../db/database");

router.get("/status/info", async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM server_data");
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(404).json({ message: "Server is offline", error: error });
    }
});

module.exports = router;
