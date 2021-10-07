import express from 'express';
import passport from 'passport';
import axios from 'axios';

module.exports = {
    getEngagement: (req, res) => {
      passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
          res.status(401);
        } else {
          let engagementId = req.query.engagementId;
          updateEngagement(user, engagementId);
          res.status(200).json({created: true});
        }
      })(req, res);
        return;
    }
}

const updateEngagement = (user, engagementId) => {
    axios.patch(
        'https://api.hubapi.com/engagements/v1/engagements/' + engagementId,
        {
          metadata: {
            status: 'COMPLETED',
            fromNumber: '(575) 221-0446'
          }
        },
        {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }
    ).then((response) => {        
        if (response.status !== 200) {
            console.error('Unable to update engagement - Id: ' + engagementId);
        }
    }).catch((err) => {
        console.error(err);
    });
};