const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const userService = require('./user.service');

const userController = {
  register: (req, res) => {
    const { body } = req;
    const salt = genSaltSync(10);

    if (!body.password || body.password.length < 8) {
      res.status(422).json({ field: 'password', message: 'Password length must be at least 8 characters' });
      return;
    }
    if (!body.email || !body.email.includes('@')) {
      res.status(422).json({ field: 'email', message: 'E-mail must have @' });
      return;
    }
    if (!body.name || body.name.length < 3) {
      res.status(422).json({ field: 'name', message: 'Name length must be at least 3 characters' });
      return;
    }

    body.password = hashSync(body.password, salt);

    userService.createUser(body, (err) => {
      if (err) {
        if (err.sqlMessage.includes('email')) {
          res.status(422).json({ field: 'email', message: 'Such email is already occupied' });
          return;
        }
        if (err.sqlMessage.includes('phone_number')) {
          res.status(422).json({ field: 'email', message: 'Such phone number is already occupied' });
          return;
        }
      }
      res.sendStatus(200);
    });
  },
  login: (req, res) => {
    const { body } = req;

    userService.getUserByEmail(body.email, (err, dbResults) => {
      if (err) {
        console.error(err);
      }
      if (!dbResults) {
        res.status(422).json({ field: 'email', message: 'Wrong email' });
        return;
      }
      const isCorrectPassword = compareSync(body.password, dbResults.password);

      if (isCorrectPassword) {
        dbResults.password = undefined;
        const jsontoken = sign({ result: dbResults }, process.env.JWT_SECRET_KEY, {
          expiresIn: '30m',
        });
        res.status(200).json({ token: jsontoken });
      } else {
        res.status(422).json({ field: 'password', message: 'Wrong password' });
      }
    });
  },
  getCurrentProfile: (req, res) => {
    verify(req.token, process.env.JWT_SECRET_KEY, (err, authorizedData) => {
      const userData = authorizedData && authorizedData.result;

      if (err) {
        res.sendStatus(401);
      } else {
        res.status(200).json({ userData });
      }
    });
  },
};

module.exports = userController;
