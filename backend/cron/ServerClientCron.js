const cron = require("node-cron");
const cfx = require("cfx-api");
const pool = require("../db/database");

const serverClientCron = async () => {
    cron.schedule("*/1 * * * *", async () => {
        const date = new Date();
        const minutes = date.getMinutes();
        if (minutes === 0 || minutes === 30) {
            try {
                const [rows] = await pool.query(
                    "SELECT server_id FROM server_data"
                );
                rows.forEach(async row => {
                    try {
                        const server = await cfx.fetchServer(row.server_id);

                        await pool.query(
                            "INSERT INTO server_player_charts SET ?",
                            {
                                server_player: server.data.clients,
                                server_id: server.id,
                                server_name: server.data.hostname,
                                timestamp: date,
                            }
                        );
                    } catch (error) {
                        await pool.query(
                            "INSERT INTO server_player_charts SET ?",
                            {
                                server_player: 0,
                                server_id: row.server_id,
                                server_name: "Server Offline",
                                timestamp: date,
                            }
                        );
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    });
};

module.exports = serverClientCron;
