import React from "react";
import { FaGithub } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
    return (
        <>
            <div className="underline"></div>
            <div className="footer">
                <div className="footerContainer">
                    <p className="footerText">
                        FiveM QC © 2024 Proudly made by{" "}
                        <FaGithub className="mx-2" />
                        <a
                            href="https://github.com/ChristianBosse"
                            className="github mr-2"
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
