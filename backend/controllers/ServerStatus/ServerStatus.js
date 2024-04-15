const router = require("express").Router();
const cfx = require("cfx-api");
const pool = require("../../db/database");

router.get("/status", async (req, res) => {
    try {
        const [servers] = await pool.query("SELECT * FROM server_data");
        const serverData = await Promise.all(
            servers.map(async server => {
                try {
                    const serverStatus = await cfx.fetchServer(
                        server.server_id
                    );

                    return {
                        message: "online",
                        server_id: serverStatus.id,
                        server_clients: serverStatus.data.clients,
                        server_max_clients: serverStatus.data.sv_maxclients,
                        server_name: serverStatus.data.hostname,
                        server_discord: serverStatus.data.vars.Discord,
                        server_website: serverStatus.data.vars.Website,
                        server_owner: serverStatus.data.ownerName,
                        server_desc: serverStatus.data.vars.sv_projectDesc,
                        server_peak: server.server_peak,
                    };
                } catch (error) {
                    console.error(error);
                    return {
                        message: "offline",
                        server_id: server.server_id,
                        server_clients: 0,
                        server_max_clients: server.server_max_client,
                        server_name: server.server_name,
                        server_discord: server.server_discord,
                        server_website: server.server_website,
                        server_owner: server.server_owner,
                        server_desc: server.server_desc,
                        server_peak: server.server_peak,
                    };
                }
            })
        );
        res.status(200).json(serverData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
