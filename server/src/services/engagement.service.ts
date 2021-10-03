import express from 'express';
import passport from 'passport';
import axios from 'axios';

type EngagementUpdate = {
    engagementId: number;
    status: string;
    fromNumber: string;
}

module.exports = {
    postEngagement: (req, res) => {
      passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
          res.status(401);
        } else {
          updateEngagement(req.body as EngagementUpdate);
          res.status(200).json({created: true});
        }
      })(req, res);
        return;
    }
}

const updateEngagement = (requestBody: EngagementUpdate) => {
    axios.patch(
        'https://api.hubapi.com/engagements/v1/engagements/' + requestBody.engagementId,
        {
          metadata: {
            status: requestBody.status,
            fromNumber: requestBody.fromNumber
          }
        },
        {
          params: {
            hapikey: process.env.HAPI_KEY
          }
        }
    ).then((response) => {        
        if (response.status !== 200) {
            console.error('Unable to update engagement - Id: ' + requestBody.engagementId);
        }
    }).catch((err) => {
        console.error(err);
    });
};