import express from 'express';
import path from 'path';

require('dotenv').config();

const morgan = require('morgan');
const cors = require('cors');
const session = require('cookie-session');
const helmet = require('helmet');
const hpp = require('hpp');
const csurf = require('csurf');
const rateLimit = require('express-rate-limit');

const port = process.env.PORT || 5000;

const passport = require('./middlewares/passport');

const app = express();
app.use(morgan('tiny'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());

app.use(
    session({
        name: 'session',
        secret: process.env.COOKIE_SECRET,
        expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
    })
);
app.use(csurf());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

app.use(passport.initialize());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const engagement = require('./routes/engagement');
app.use('/api/engagement', engagement);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', '..', 'react-ui', 'build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '..', '..', 'react-ui', 'build','index.html'))
    );
}

app.listen(port, () => {
    return console.log(`Server is listening on port ${port}`);
});