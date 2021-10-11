import express from 'express';
import passport from 'passport';
import axios from 'axios';

type EngagementMetadata = {
  metadata: {
    status: string;
    fromNumber: string;
    disposition?: string;
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
  let engagementId = req.query.engagementId;
  let dispositionId = req.query.disposition;
  console.log('Disposition ID = ' + dispositionId);
  

  let bodyMetadata: EngagementMetadata = {
    metadata: {
      status: 'COMPLETED',
      fromNumber: '(575) 221-0446'
    }
  }

  if (dispositionId !== '') {
    bodyMetadata.metadata.disposition = dispositionId;
  }
  console.log('Metadata = ' + bodyMetadata);
  
    axios.patch(
        'https://api.hubapi.com/engagements/v1/engagements/' + engagementId,
        bodyMetadata,
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