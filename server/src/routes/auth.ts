import passport from 'passport';

const express = require('express');
//const axios = require('axios');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Move to API
/* function retrieveDispositions (auth) {
    axios.get('https://api.hubapi.com/calling/v1/dispositions', {
        headers: {
            'Authorization': 'Bearer ' + auth.token,
            'Accept': 'application/json'
        }
    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.error(err);
    })
}; */

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
            console.log('not logged in');
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

const jwtRequired = passport.authenticate('jwt', { session: false });

router.get('/private-route', jwtRequired, (req, res) => {
    return res.send('This is a private route');
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