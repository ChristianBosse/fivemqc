import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Collapse,
    IconButton,
    Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import "./ServerExplorer.css";
import PlayerCharts from "../playerCharts/PlayerCharts";

const ServerExplorer = props => {
    const [expanded, setExpanded] = useState(false);

    const {
        server_desc,
        server_discord,
        server_id,
        server_max_client,
        server_name,
        server_owner,
        server_website,
    } = props.server;

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        // <ThemeProvider theme={darkTheme}>
        // <CssBaseline />
        <div className="serverWrapper ">
            <div className="serverContainer">
                <Card>
                    <CardContent className="dark:bg-slate-700">
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item xs={4}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    className="text-white font-bold text-lg"
                                >
                                    {server_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography
                                    variant="h6"
                                    className="text-white font-bold text-lg"
                                >
                                    Players: 100/{server_max_client}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography
                                    variant="h6"
                                    className="text-white font-bold text-lg"
                                >
                                    Average Daily Players: 100
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                container
                                justifyContent="center"
                                alignItems="center"
                            >
                                <IconButton
                                    onClick={toggleExpansion}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent className="dark:bg-slate-600">
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid item xs={4}>
                                    <Typography
                                        variant="h6"
                                        className="text-white font-bold text-lg"
                                    >
                                        Discord:{" "}
                                        <a
                                            href={`https://${server_discord}`}
                                            target="_blank"
                                        >
                                            {server_name} Discord
                                            <OpenInNewIcon />
                                        </a>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography
                                        variant="h6"
                                        className="text-white font-bold text-lg"
                                    >
                                        Website:{" "}
                                        <a
                                            href={`https://${server_website}`}
                                            target="_blank"
                                        >
                                            {server_website} Website
                                            <OpenInNewIcon />
                                        </a>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography
                                        variant="h6"
                                        className="text-white font-bold text-lg"
                                    >
                                        Server Owner: {server_owner}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography
                                        variant="h6"
                                        className="text-white font-bold text-lg"
                                    >
                                        Server Description: {server_desc}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <PlayerCharts />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        </div>
        // </ThemeProvider>
    );
};

export default ServerExplorer;
