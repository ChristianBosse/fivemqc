import React from "react";
import "./MainPage.css";
import AddServer from "../components/addserver/AddServer";
import ServerExplorer from "../components/serverExplorer/ServerExplorer";

const MainPage = () => {
    return (
        <>
            <div className="main-page">
                <div className="mainWrapper">
                    <h1 className="addServer">
                        Want to add your server? Contact us below!
                    </h1>
                    <AddServer />
                </div>
                <ServerExplorer />
            </div>
        </>
    );
};

export default MainPage;
