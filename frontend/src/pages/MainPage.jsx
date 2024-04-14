import React, { useEffect, useState } from "react";
import "./MainPage.css";
import AddServer from "../components/addserver/AddServer";
import ServerExplorer from "../components/serverExplorer/ServerExplorer";

const MainPage = () => {
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/status/info")
            .then(res => res.json())
            .then(data => {
                setServerData(data);
            });
    }, []);

    return (
        <>
            <div className="main-page">
                <div className="mainWrapper">
                    <h1 className="addServer">
                        Want to add your server? Contact us below!
                    </h1>
                    <AddServer />
                </div>
                {serverData.map(server => (
                    <ServerExplorer key={server.server_id} server={server} />
                ))}
            </div>
        </>
    );
};

export default MainPage;
