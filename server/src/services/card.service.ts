import models from '../models';
const crypto = require('crypto');

module.exports = {
    getCardVerify: (req, res) => {

        if (!verifySignature(req)) {
            return res.status(400);
        }
        
        if (JSON.stringify(req.query) === '{}') {
            return res.status(400);
        }

        const objectId = Number(req.query.associatedObjectId);
        const now = new Date();
        const filter = { 
            hubSpotUserId: req.query.userId,
            hubSpotPortalId: req.query.portalId
        };

        models.User.findOne(filter, (err, result) => {
            console.log('mongo result ' + result);
            
                if (err || !result) {
                    console.error(err);
                    return res.status(401).json({
                        results: [
                            {
                                objectId: objectId,
                                title: 'Please Sign In to Call Using Five9',
                                link: 'https://' + process.env.HEROKU_APP_NAME + '.herokuapp.com/',
                                description: "We've detected that you're not logged into the Five9 HubSpot Dialer app. Click the link above to login, then refresh this page."
                            }
                        ]
                    });
                }
                if (result && result.sessionExpiration > now) {
                    return res.status(200).json({
                        results: [
                            {
                                objectId: objectId,
                                title: 'Five9 HubSpot Dialer',
                                description: "Authenticated - Click-to-Dial Enabled",

                            }
                        ]
                    });
                }
                if (result && result.sessionExpiration < now) {
                    return res.status(401).json({
                        results: [
                            {
                                objectId: objectId,
                                title: 'Please Sign In to Call Using Five9',
                                link: 'https://' + process.env.HEROKU_APP_NAME + '.herokuapp.com/',
                                description: "We've detected that you're not logged into the Five9 HubSpot Dialer app. Click the link above to login, then refresh this page."
                            }
                        ]
                    });
                }
            }
        );

    }
}

function verifySignature(req) {

    const sourceString = process.env.CALLING_EXT_APP_SECRET +
                        'GET' +
                        'https://' + process.env.HEROKU_APP_NAME + '.herokuapp.com' + req.originalUrl;

    const hash = crypto.createHash('sha256').update(sourceString).digest('hex');

    return req.get('x-hubspot-signature') === hash;

}   