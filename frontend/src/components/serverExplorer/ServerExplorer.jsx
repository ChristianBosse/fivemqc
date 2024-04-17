import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Collapse,
    IconButton,
    Grid,
    Badge,
    Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import "./ServerExplorer.css";
import PlayerCharts from "../playerCharts/PlayerCharts";

const ServerExplorer = props => {
    const [expanded, setExpanded] = useState(false);

    const {
        message,
        server_clients,
        server_discord,
        server_id,
        server_max_clients,
        server_name,
        server_owner,
        server_desc,
        server_website,
        server_peak,
        server_charts,
    } = props.server;

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    const characterLimit = str => {
        try {
            if (str.length >= 16) {
                return str.substring(0, 16) + "...";
            } else {
                return str;
            }
        } catch (error) {
            return "N/A";
        }
    };

    return (
        // <ThemeProvider theme={darkTheme}>
        // <CssBaseline />

        <div className="serverWrapper ">
            <div className="serverContainer">
                <Card className="my-10">
                    <CardContent className="dark:bg-slate-700">
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item xs={12} md={6} xl={4}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    className="text-white font-bold text-lg"
                                >
                                    {message === "online" ? (
                                        <>
                                            {characterLimit(server_name)}
                                            <Badge
                                                color="success"
                                                badgeContent={"Online"}
                                                className="ml-8"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {characterLimit(server_name)}
                                            <Badge
                                                color="error"
                                                badgeContent={"Offline"}
                                                className="ml-8"
                                            />
                                        </>
                                    )}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} xl={4}>
                                <Typography
                                    variant="h6"
                                    className="text-white font-bold text-lg"
                                >
                                    Players: {server_clients}/
                                    {server_max_clients}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} xl={4}>
                                <Typography
                                    variant="h6"
                                    className="text-white font-bold text-lg"
                                >
                                    Peak Daily Players: {server_peak}
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
                                spacing={3}
                            >
                                <Grid item xs={12} md={6} xl={4}>
                                    <Typography
                                        variant="h6"
                                        className="text-white font-bold text-lg"
                                    >
                                        Discord:{" "}
                                        <a
                                            href={`${server_discord}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {characterLimit(server_discord)}
                                            <OpenInNewIcon />
                                        </a>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} xl={4}>
                                    <Typography
                                        variant="h6"
                                        className="text-white font-bold text-lg"
                                    >
                                        Website:{" "}
                                        <a
                                            href={`${server_website}`}
                                            target="_blank"
                                        >
                                            {characterLimit(server_website)}
                                            <OpenInNewIcon />
                                        </a>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} xl={4}>
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
                                    <PlayerCharts
                                        key={server_id}
                                        charts={server_charts}
                                    />
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
