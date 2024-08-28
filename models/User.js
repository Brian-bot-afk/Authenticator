const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  static async create(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
        [name, email, hashedPassword],
        function(err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  }
}

module.exports = User;