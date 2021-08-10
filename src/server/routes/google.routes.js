const express = require('express');
const boom = require('@hapi/boom');
const passport = require('passport');
const { config } = require('../config');

const THIRTY_DAYS_IN_SEC = 2592000000;
const TWO_HOURS_IN_SEC = 7200000;

/** google strategy */
require('../utils/auth/strategies/google.strategy');

function googleApp(app) {
  const router = express.Router();
  app.use('/auth', router);

  router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['email', 'profile', 'openid'],
    }),
  );

  router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res, next) => {
      const { rememberMe } = req.body;
      if (!req.user) {
        next(boom.unauthorized());
      }
      const { token, ...user } = req.user.data;
      res.cookie('token', token, {
        httpOnly: !config.dev,
        secure: !config.dev,
        maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
      });
      res.status(200).json(user);
    },
  );
}

module.exports = googleApp;