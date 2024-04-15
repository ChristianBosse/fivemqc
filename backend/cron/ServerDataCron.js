const cron = require("node-cron");
const cfx = require("cfx-api");
const pool = require("../db/database");

const peakDailyPlayers = async () => {
    cron.schedule("*/1 * * * *", async () => {
        const date = new Date();
        const minutes = date.getMinutes();
        if (minutes == 37) {
            try {
                const [rows] = await pool.query(
                    "SELECT server_id FROM server_list"
                );
                rows.forEach(async row => {
                    const [data] = await pool.query(
                        "SELECT * FROM server_player_charts WHERE server_id = ?",
                        [row.server_id]
                    );

                    const peak = data.reduce((highest, player) => {
                        return player.server_player > highest
                            ? player.server_player
                            : highest;
                    }, 0);

                    const result = await pool.query(
                        "UPDATE server_data SET server_peak = ? WHERE server_id = ?",
                        [peak, row.server_id]
                    );
                });
            } catch (error) {
                console.log(error);
            }
        }
    });
};

const serverDataSchedule = async () => {
    cron.schedule("*/1 * * * *", async () => {
        const date = new Date();
        const minutes = date.getMinutes();
        if (minutes === 58) {
            const [rows] = await pool.query(
                "SELECT server_id FROM server_list"
            );
            rows.forEach(async row => {
                try {
                    const server_id = row.server_id;
                    const server = await cfx.fetchServer(server_id);

                    await pool.query("REPLACE INTO server_data SET ?", {
                        server_id: server.id,
                        server_name: server.data.hostname,
                        server_max_client: server.data.sv_maxclients,
                        server_discord: server.data.vars.Discord,
                        server_website: server.data.vars.Website,
                        server_desc: server.data.vars.sv_projectDesc,
                        server_owner: server.data.ownerName,
                    });
                    console.log(`Server ${server_id} has been updated!`);
                } catch (error) {
                    console.log(
                        `Server ${row.server_id} has an error: ${error}`
                    );
                }
            });
        } else {
            console.log("Not the time to update! ", minutes);
        }
    });
};

module.exports = { peakDailyPlayers, serverDataSchedule };
