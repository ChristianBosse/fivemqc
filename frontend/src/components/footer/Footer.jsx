import React from "react";
import { FaGithub } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
    return (
        <>
            <div className="underline"></div>
            <div className="footer">
                <div className="container">
                    <p className="footerText">
                        FiveM QC © 2024 Proudly made by <FaGithub />{" "}
                        <a
                            href="https://github.com/ChristianBosse"
                            className="github"
                        >
                            Christian Bosse
                        </a>{" "}
                        for QC RP Servers
                    </p>
                </div>
            </div>
        </>
    );
};

export default Footer;
