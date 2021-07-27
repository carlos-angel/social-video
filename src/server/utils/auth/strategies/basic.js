const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const axios = require('axios');
const { config } = require('../../../config');

passport.use(
  new BasicStrategy(async (email, password, callback) => {
    try {
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/v1/auth/sign-in`,
        method: 'post',
        auth: {
          password,
          username: email,
        },
        data: {
          apiKeyToken: config.apiKeyToken,
        },
      });

      if (!data || status !== 200) {
        return callback(boom.unauthorized(), false);
      }
      return callback(null, data);
    } catch (error) {
      return callback(error);
    }
  }),
);