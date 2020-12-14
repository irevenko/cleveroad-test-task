const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const Joi = require('joi');
const userService = require('./user.service');

const userRegistrationScheme = Joi.object({
  name: Joi.string().trim().required().min(3),
  email: Joi.string().trim().required().email(),
  password: Joi.string().trim().required().min(8),
  phone_number: Joi.string().trim().min(5),
});

const userController = {
  register: (req, res) => {
    const { body } = req;
    const salt = genSaltSync(10);
    const validBody = userRegistrationScheme.validate(body);

    if (validBody.error) {
      res.status(422).send(validBody.error.details[0]);
      return;
    }

    validBody.value.password = hashSync(validBody.value.password, salt);

    userService.createUser(validBody.value, (err) => {
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
