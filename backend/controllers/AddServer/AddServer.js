require("dotenv").config();
const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/addServer", async (req, res) => {
    const { owner, server, serverUrl, email, token } = req.body;

    let isCaptchValid = false;

    await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SITE_SECRET}&response=${token}`
    )
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                isCaptchValid = true;
                return res.status(200).json({ message: "Captcha Passed!" });
            }
        });

    if (isCaptchValid) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Server Request from ${owner}`,
            text: `Owner: ${owner} \nServer: ${server} \nServer URL: ${serverUrl} \nEmail: ${email}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err, message: "Error" });
            } else {
                console.log(info);
                res.status(200).json({ message: "Email sent successfully" });
            }
        });
    }
});

module.exports = router;
