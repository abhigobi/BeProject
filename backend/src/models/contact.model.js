const db = require('../config/db.config');

const Contact = {
  getAll: (result) => {
    db.query('SELECT * FROM contacts', (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  },

  create: (contact, result) => {
    db.query('INSERT INTO contacts SET ?', contact, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...contact });
    });
  }
};

module.exports = Contact;
