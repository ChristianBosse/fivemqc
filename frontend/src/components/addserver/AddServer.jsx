import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Alert,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "#101418",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,

    //responsive

    "@media (max-width: 600px)": {
        width: "86%",
    },
};

const inputLabelStyle = {
    color: "white",
};

const inputStyle = {
    input: { color: "white" },
    label: { color: "white" },
    width: "100%",
    backgroundColor: "rgb(51 65 85)",
    marginBottom: "5%",
};

const AddServer = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [owner, setOwner] = useState("");
    const [server, setServer] = useState("");
    const [serverUrl, setServerUrl] = useState("");
    const [email, setEmail] = useState("");

    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);

    const captchaRef = useRef(null);

    const handleCloseAlert = () => {
        setIsEmailError(false);
        setIsEmailSent(false);
    };

    const handleSubmit = async () => {
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();
        // Send the data to the server
        fetch(`${import.meta.env.VITE_APP_URL}/api/addServer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                owner: owner,
                server: server,
                serverUrl: serverUrl,
                email: email,
                token: token,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
                setOwner("");
                setServer("");
                setServerUrl("");
                setEmail("");
                setIsEmailSent(true);
                setTimeout(() => {
                    handleCloseAlert();
                }, 3000);
            })
            .catch(error => {
                console.error("Error:", error);
                setIsEmailError(true);
                setTimeout(() => {
                    handleCloseAlert();
                }, 3000);
            });
    };

    return (
        <div>
            {isEmailSent && (
                <Alert
                    severity="success"
                    sx={{ width: "50%", margin: "auto" }}
                    style={{
                        position: "absolute",
                        left: "25%",
                        top: "5%",
                        zIndex: 999,
                    }}
                >
                    Email sent successfully!
                </Alert>
            )}
            {isEmailError && (
                <Alert
                    severity="warning"
                    sx={{ width: "50%", margin: "auto" }}
                    style={{
                        position: "absolute",
                        left: "25%",
                        top: "5%",
                        zIndex: 999,
                    }}
                >
                    Email not sent! Please try again.
                </Alert>
            )}
            <Button onClick={handleOpen} variant="contained" color="success">
                Contact Us!
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <FormControl>
                            <InputLabel htmlFor="owner" sx={inputLabelStyle}>
                                Owner Name
                            </InputLabel>
                            <Input
                                id="owner"
                                sx={inputStyle}
                                value={owner}
                                onInput={e => setOwner(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="server" sx={inputLabelStyle}>
                                Server Name
                            </InputLabel>
                            <Input
                                id="server"
                                sx={inputStyle}
                                value={server}
                                onInput={e => setServer(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel
                                htmlFor="serverUrl"
                                sx={inputLabelStyle}
                            >
                                Server URL eg:
                                https://servers.fivem.net/servers/detail/y68nvf
                            </InputLabel>
                            <Input
                                id="serverUrl"
                                sx={inputStyle}
                                value={serverUrl}
                                onInput={e => setServerUrl(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="email" sx={inputLabelStyle}>
                                Email Address
                            </InputLabel>
                            <Input
                                id="email"
                                aria-describedby="email-helper-text"
                                sx={inputStyle}
                                value={email}
                                onInput={e => setEmail(e.target.value)}
                            />
                            <FormHelperText
                                id="email-helper-text"
                                sx={{ color: "white" }}
                            >
                                We'll never share your email.
                            </FormHelperText>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mt: 2 }}
                            style={{ float: "right" }}
                            onClick={handleSubmit}
                        >
                            SEND SERVER
                        </Button>
                        <ReCAPTCHA
                            className="mt-5"
                            sitekey={import.meta.env.VITE_APP_SITE_KEY}
                            ref={captchaRef}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddServer;
