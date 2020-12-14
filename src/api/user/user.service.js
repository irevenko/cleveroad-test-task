const pool = require('../../helpers/db');

const userService = {
  createUser: (data, callback) => {
    pool.query(
      `INSERT INTO user(name, email, password, phone_number)
         values(?, ?, ?, ?)`,
      [
        data.name,
        data.email,
        data.password,
        data.phone_number,
      ],
      (error, dbResults) => {
        if (error) {
          return callback(error);
        }
        return callback(null, dbResults);
      },
    );
  },
  getUserByEmail: (email, callback) => {
    pool.query(
      'SELECT * FROM user WHERE email = ?',
      [email],
      (error, dbResults) => {
        if (error) {
          callback(error);
        }
        return callback(null, dbResults[0]);
      },
    );
  },
};

module.exports = userService;
