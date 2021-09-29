import passport from 'passport';
const HubSpotStrategy = require('passport-hubspot-auth').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

passport.use(new HubSpotStrategy({
    clientID: process.env.HS_CLIENT_ID,
    clientSecret: process.env.HS_CLIENT_SECRET,
    callbackURL: process.env.HS_CALLBACK_URL,
    passReqToCallback: true
    }, (request, accessToken, refreshToken, profile, done) => {
        return done(profile);
    }
));

passport.use(new JwtStrategy(
    {
        jwtFromRequest: (req) => req.session.jwt,
        secretOrKey: process.env.JWT_SECRET_KEY,
    },
    (payload, done) => {
        // TODO: add additional jwt token verification
        return done(null, payload);
    }
));

module.exports = passport;