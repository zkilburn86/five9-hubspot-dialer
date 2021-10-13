import express from 'express';
import passport from 'passport';
import axios from 'axios';

type EngagementMetadata = {
  metadata: {
    status: string;
    disposition: string;
    fromNumber: string;
    durationMilliseconds: string;
    title: string;
    recordingUrl: string;
    appId: string;
  };
}

module.exports = {
    getEngagement: (req, res) => {
      passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
          res.status(401);
        } else {
          updateEngagement(user, req);
          res.status(200).json({created: true});
        }
      })(req, res);
        return;
    }
}

const updateEngagement = (user, req) => {
  let query = req.query;

  let bodyMetadata: EngagementMetadata = {
    metadata: {
      status: 'COMPLETED',
      disposition: query.disposition,
      fromNumber: query.fromNumber,
      durationMilliseconds: query.durationMilliseconds,
      title: query.title,
      recordingUrl: query.recordingUrl,
      appId: query.appId
    }
  }

    axios.patch(
        'https://api.hubapi.com/engagements/v1/engagements/' + query.engagementId,
        bodyMetadata,
        {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }
    ).then((response) => {        
        if (response.status !== 200) {
            console.error('Unable to update engagement - Id: ' + query.engagementId);
        }
    }).catch((err) => {
        console.error(err);
    });
};