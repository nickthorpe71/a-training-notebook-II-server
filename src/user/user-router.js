const express = require('express');
const UserService = require('./user-service');
const path = require('path');

const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter.post('/', jsonBodyParser, (req, res, next) => {
  let { password, username, email } = req.body;

  username = username.toLowerCase();

  for (const field of ['username', 'password', 'email'])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`,
      });

  const passwordError = UserService.validatePassword(password);
  if (passwordError) return res.status(400).json({ error: passwordError });
  UserService.hasUserWithUsername(req.app.get('db'), username)
    .then((hasUserWithUsername) => {
      if (hasUserWithUsername)
        return res.status(400).json({ error: 'Username taken' });

      return UserService.hashPassword(password).then((hashedPassword) => {
        const newUser = {
          username,
          password: hashedPassword,
          email,
        };

        return UserService.insertUser(req.app.get('db'), newUser).then(
          (user) => {
            res
              .status(201)
              .json(UserService.serializeUser(user));
          }
        );
      });
    })
    .catch(next);
});

module.exports = userRouter;
