const router = require("express").Router();
const cfx = require("cfx-api");
const pool = require("../../db/database");

function extractValidDiscordUrl(text) {
    if (typeof text !== "string") return null;

    // Regular expression to match Discord invite URLs with optional preceding characters
    const discordUrlRegex =
        /(?:https?:\/\/)?(?:www\.)?(?:\S+\/)?discord\.gg\/[a-zA-Z0-9]+/i;
    const matches = text.match(discordUrlRegex);

    // If matches found, return the first one with "https://" prefix, otherwise return null
    return matches
        ? matches[0].startsWith("http")
            ? matches[0]
            : `https://${matches[0]}`
        : null;
}

function ensureHttps(url) {
    if (typeof url !== "string") return null;

    // Check if the URL starts with "http://" or "https://", if not, prepend "https://"
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`;
    }
    return url;
}

router.get("/status", async (req, res) => {
    try {
        const [servers] = await pool.query("SELECT * FROM server_data");
        const serverData = await Promise.all(
            servers.map(async server => {
                try {
                    const serverStatus = await cfx.fetchServer(
                        server.server_id
                    );

                    //get the last 24 hours of player data in 30 minute intervals
                    const [playerData] = await pool.query(
                        "SELECT * FROM server_player_charts WHERE server_id = ? ORDER BY timestamp DESC LIMIT 96",
                        [server.server_id]
                    );

                    const reversedPlayerData = playerData.reverse();
                    //remove miliseconds from the timestamp
                    const chartData = reversedPlayerData.map(data => {
                        return {
                            date: data.timestamp.toString().slice(0, -4),
                            players: data.server_player,
                        };
                    });

                    const validDiscord = extractValidDiscordUrl(
                        serverStatus.data.vars.Discord
                    );

                    const validHttpsWebsite = ensureHttps(
                        serverStatus.data.vars.Website
                    );

                    return {
                        message: "online",
                        server_id: serverStatus.id,
                        server_clients: serverStatus.data.clients,
                        server_max_clients: serverStatus.data.sv_maxclients,
                        server_name: serverStatus.data.hostname,
                        server_discord: validDiscord,
                        server_website: validHttpsWebsite,
                        server_owner: serverStatus.data.ownerName,
                        server_desc: serverStatus.data.vars.sv_projectDesc,
                        server_peak: server.server_peak,
                        server_charts: chartData,
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
