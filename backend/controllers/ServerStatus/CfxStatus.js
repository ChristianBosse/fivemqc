const router = require("express").Router();
const cfx = require("cfx-api");

router.get("/status/cfx", async (req, res) => {
    try {
        const cfxStatus = await cfx.fetchStatus();
        res.status(200).json(cfxStatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
