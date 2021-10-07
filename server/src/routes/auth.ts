import passport from 'passport';
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get(
    '/login',
    (req, res, next) => {
        next();
    },
    passport.authenticate('hubspot', {
        scope: ['contacts', 'oauth']
    }),
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/callback', (req, res, next) => {
    passport.authenticate('hubspot', (profile) => {
        if (!profile) {
            return res.redirect('/login');
        }
        req.session.jwt = jwt.sign(profile, process.env.JWT_SECRET_KEY);
        return res.redirect('/');
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

router.get('/current-session', (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.send(false);
        } else {
            res.send(user);
        }
    })(req, res);
});

module.exports = router;