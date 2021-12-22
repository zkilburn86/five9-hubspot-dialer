import passport from 'passport';
import express from 'express';
import jwt from 'jsonwebtoken';
import models from '../models';

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
        
        let currentDate = new Date();
        let expirationStamp = currentDate.setSeconds(currentDate.getSeconds() + profile.expires_in);
        const filter = { 
            hubSpotUserId: profile.user_id,
            hubSpotPortalId: profile.hub_id
        };
        const update = {
            sessionExpiration: new Date(expirationStamp),
            email: profile.user,
            csrfSecret: req.session.csrfSecret
        };

        models.User.findOneAndUpdate(filter, update, {
                upsert: true
            }, (err, result) => {
               if (err) {
                   console.error(err);
                   return res.redirect('/login');
               }
            }
        );
        
        return res.redirect('/');
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    const filter = {
        csrfSecret: req.session.csrfSecret
    };
    const update = {
        sessionExpiration: new Date(0)
    };

    models.User.findOneAndUpdate(filter, update, {
            upsert: false
        }, (err, result) => {
            if (err) {
                console.error(err);
            }
        }
    );

    req.session.destroy();
    res.redirect('/');
});

router.get('/current-session', (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, profile) => {
        if (err || !profile) {
            res.send(false);
        } else {
            res.send(profile.user);
        }
    })(req, res);
});

module.exports = router;