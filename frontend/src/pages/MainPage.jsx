import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AddServer from "../components/addserver/AddServer";
import ServerExplorer from "../components/serverExplorer/ServerExplorer";

const MainPage = () => {
    const [serverData, setServerData] = useState([]);
    const [cfxStatus, setCfxStatus] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchServerLiveData = async () => {
            try {
                fetch(`${import.meta.env.VITE_APP_URL}/api/status`)
                    .then(res => res.json())
                    .then(data => {
                        const sortedData = data.sort((a, b) => {
                            return b.server_clients - a.server_clients;
                        });

                        setServerData(sortedData);
                    });
            } catch (error) {
                console.error(error);
            }
        };

        const fetchCfxStatus = async () => {
            try {
                fetch(`${import.meta.env.VITE_APP_URL}/api/status/cfx`)
                    .then(res => res.json())
                    .then(data => {
                        setCfxStatus(data);
                    });
            } catch (error) {
                console.error(error);
            }
        };

        const runFetch = async () => {
            await fetchServerLiveData();
            await fetchCfxStatus();
            setLoading(true);
        };

        runFetch();
    }, []);

    return (
        <>
            {!loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        backgroundColor: "#101418",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <div className="main-page">
                    <div className="mainWrapper">
                        <h1 className="addServer">
                            Want to add your server? Contact us below!
                        </h1>
                        <AddServer />
                    </div>
                    <Stack
                        sx={{
                            width: "50%",
                            margin: "auto",
                        }}
                        spacing={2}
                        className="cfxStatus"
                    >
                        {cfxStatus.description === "All Systems Operational" ? (
                            <Alert
                                variant="filled"
                                severity="success"
                                sx={{ color: "white" }}
                            >
                                CFX API: {cfxStatus.description}
                            </Alert>
                        ) : (
                            <Alert
                                variant="filled"
                                severity="warning"
                                sx={{ color: "white" }}
                            >
                                Problem with CFX API: {cfxStatus.description}
                            </Alert>
                        )}
                    </Stack>
                    {serverData.map(server => (
                        <ServerExplorer
                            key={server.server_id}
                            server={server}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default MainPage;
