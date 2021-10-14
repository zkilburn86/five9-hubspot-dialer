import passport from "passport";

module.exports = {
    getCardVerify: (req, res) => {
        console.log('Card verify request query: ' + JSON.stringify(req.query));
        
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                res.status(401).json({
                    results: [
                        {
                            objectId: 101,
                            title: 'This is a Test Auth Failed',
                            link: 'https://f9hsdialer-pr-5.herokuapp.com/',
                            email: 'zach@kilburnconsulting.com'
                        }
                    ]
                });
            } else {
                res.status(200).json({
                    results: [
                        {
                            objectId: 101,
                            title: 'This is a Test',
                            link: 'https://f9hsdialer-pr-5.herokuapp.com/',
                            email: 'zach@kilburnconsulting.com'
                        }
                    ]
                });
            }
        })(req, res);
        return;
    }
}
