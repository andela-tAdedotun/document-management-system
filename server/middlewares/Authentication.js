/* eslint-disable camelcase */
import passport from 'passport';
import dotenv from 'dotenv';
import passportJwt from 'passport-jwt';
import models from '../models/';

dotenv.config();
const secret = process.env.SECRET;

const User = models.User;
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = secret;

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

export default {
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate('jwt', { session: false }),
};
