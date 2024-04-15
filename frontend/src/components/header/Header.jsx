import React from "react";
import fivemLogo from "../../assets/FiveM-Logo.png";
import "./Header.css";

const Header = () => {
    return (
        <div className="stickyHeader">
            <div className="wrapper">
                <div className="headerContainer">
                    <a href="/" className="logo_ref">
                        <img
                            className="logo"
                            src={fivemLogo}
                            alt="FiveM Logo"
                        />
                        <p className="title">FiveM QC</p>
                    </a>
                </div>
            </div>
            <div className="underline"></div>
        </div>
    );
};

export default Header;
