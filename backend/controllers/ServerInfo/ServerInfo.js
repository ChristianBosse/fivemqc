const router = require("express").Router();
const cfx = require("cfx-api");

router.get("/status/info", async (req, res) => {
    try {
        const server = await cfx.fetchServer("7d7mjv");
        res.status(200).json(server);
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

module.exports = router;
