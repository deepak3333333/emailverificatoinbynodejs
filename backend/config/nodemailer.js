const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "86f2a5003@smtp-brevo.com",
    pass: "mjHzRt6OwQYhM3nk",
  },
});


module.exports = transporter;