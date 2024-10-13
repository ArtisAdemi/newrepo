const nodemailer = require('nodemailer');
require('dotenv').config();
const db = require("../models")
const Products = db.Products;

// Configuring email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

// Send Email function
const sendContactEmail = (userData) => {
    const { name, email, phone, message } = userData;

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL, // Send email to the address saved in process.env.EMAIL
        subject: "New Contact Form Submission",
        html: `
        <p>Hello,</p>
        <p>A user has contacted us with the following details:</p>
        <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phone}</li>
        </ul>
        <p>Message:</p>
        <p>${message}</p>
    `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

// const sendEmail = async ({email, subject, message}) => {
//     const mailOptions = {
//         from: process.env.EMAIL, 
//         to: email, // Send email to the address saved in process.env.EMAIL
//         subject: subject,
//         html: `
//         <p>Hello</p>
//         <p>Message:</p>
//         <p>${message}</p>
//         <a href="http://localhost:3000">Check it out</a>
//     `
//     }

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log("Email sent: " + info.response);
//         }
//     });
// }

const sendEmail = async (to, subject, message) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // your email
            pass: process.env.PASS,    // your email password
        },
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: message,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;  // rethrow error to be handled in the caller function
    }
};

async function notifyUsersOfStockChange(productId) {
    const notifications = await db.StockNotifications.findAll({
        where: {
            productId: productId,
            notify: true
        },
    });

    const product = await Products.findByPk(productId);


    notifications.forEach(async (notification) => {
        const user = await db.Users.findByPk(notification.userId)
        let msg = `
            <html>
                <body>
                    <p>Hello ${user.firstName}!</p>
                    <p>The product you were interested in titled: ${product.title}, was recently put back in stock.</p>
                    <a href="http://localhost:3000/products/all/${product.id}">Check it our here</a>
                    <p>Thank you for shopping with us!</p>
                </body>
            </html>
        `;
        sendEmail(user.email, "Product Back in Stock", msg);


        // Update notification to false after sending email
        await notification.update({ notify: false });
    });
};


module.exports = { sendContactEmail, notifyUsersOfStockChange, sendEmail };
