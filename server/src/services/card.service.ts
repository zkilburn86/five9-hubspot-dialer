import models from '../models';
const crypto = require('crypto');

module.exports = {
    getCardVerify: (req, res) => {

        verifySignature(req);
        
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
                                title: 'Not Authorized Please Login',
                                link: 'https://f9hsdialer-pr-5.herokuapp.com/'
                            }
                        ]
                    });
                }
                if (result && result.sessionExpiration > now) {
                    return res.status(200).json({
                        results: [
                            {
                                objectId: objectId,
                                title: 'You Are Authorized',
                                link: 'https://f9hsdialer-pr-5.herokuapp.com/'
                            }
                        ]
                    });
                }
                if (result && result.sessionExpiration < now) {
                    return res.status(401).json({
                        results: [
                            {
                                objectId: objectId,
                                title: 'Not Authorized Please Login',
                                link: 'https://f9hsdialer-pr-5.herokuapp.com/'
                            }
                        ]
                    });
                }
            }
        );

    }
}

function verifySignature(req) {
    //TODO make request url dynamic
    const sourceString = process.env.CALLING_EXT_APP_SECRET +
                        'GET' +
                        'https://' + process.env.HEROKU_APP_NAME + '.herokuapp.com' + req.originalUrl;
    console.log('sourceString ' + sourceString);
    const hash = crypto.createHash('sha256').update(sourceString).digest('hex');
    console.log('hash: ' + hash);

    console.log('hs signature: ' + req.get('x-hubspot-signature'));
    
    
    console.log(req.get('x-hubspot-signature') === hash);
    
}   