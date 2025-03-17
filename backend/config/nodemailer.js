const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "877846001@smtp-brevo.com",
    pass: "HZO6Ta7Cyj1xG4Vc",
    
  },
});


module.exports = transporter;