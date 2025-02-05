const nodemailer = require('nodemailer');
const Contact = require('../models/contact.model');



// Add this to existing controller
exports.createContact = (req, res) => {
  if (!req.body.email || !req.body.name) {
    res.status(400).json({ message: "Name and email required" });
    return;
  }

  const contact = {
    name: req.body.name,
    email: req.body.email
  };

  Contact.create(contact, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Error creating contact"
      });
      return;
    }
    res.json(data);
  });
};
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.getContacts = (req, res) => {
  Contact.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Error retrieving contacts"
      });
      return;
    }
    res.json(data);
  });
};

exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  
  if (!to || !subject || !text) {
    res.status(400).json({ message: "Content can't be empty!" });
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error sending email"
    });
  }
};
