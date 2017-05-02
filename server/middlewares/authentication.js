/* eslint-disable camelcase */

const User = require('../models/').User;
const config = require('../config/config.js');
const passport = require('passport');
const passportJwt = require('passport-jwt');

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.secret;

const jwtStrategy = new JwtStrategy(jwtOptions,
  (jwt_payload, next) => {
    User.findOne({ where: { id: jwt_payload.id } })
      .then((user) => {
        if (user) {
          next(null, jwt_payload);
        } else {
          next(null, false);
        }
      });
  });
passport.use(jwtStrategy);

module.exports = {
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate('jwt', { session: false }),
};
