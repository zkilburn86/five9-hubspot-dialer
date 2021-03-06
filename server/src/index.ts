import express from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

type cookieSession = {
    secret: string,
    resave: boolean,
    saveUninitialized: boolean,
    cookie: any,
    store: any
}

require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production' ? true : false;
const httpsRequired = process.env.REQUIRE_HTTPS === 'true' ? true : false;
const DB_HOST = process.env.DB_HOST;

const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const hpp = require('hpp');
const csurf = require('csurf');
const rateLimit = require('express-rate-limit');
const db = require('./db');

const port = process.env.PORT || 5000;

const passport = require('./middlewares/passport');

const app = express();
app.use(morgan('tiny'));

if (isProd) {
    db.connect(process.env.MONGO_CONNECTION)
} else {
    db.connect(DB_HOST);
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: false,
        directives: {
            "default-src": ["'self'"],
            "script-src": [
                "'self'", 
                "https://code.jquery.com", 
                "https://cdnjs.cloudflare.com", 
                "'sha256-G2fRka9lB4aluMRByPZWSlTusEZO/ht+n0eYeALQEcg='",
                "'sha256-Sp5KYWn6waQ6HUfejFOTYk/gHJ4F2j8iWc82zHnH3PU='",
                "'sha256-By8tg0wmYA/WBn3TRGe5fjD0QkgghbkF3lSDVOjckz0='",
                "'sha256-QGcVAXZHYeMIVF5FPtLj8xVt+kIVezAIOxDmpvmPYnY='"
            ],
            "style-src": [
                "'self'",
                "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='"
            ],
            "img-src": ["'self'"],
            "connect-src": [
                "'self'",
                "*.five9.com",
                "*.hubspot.com"
            ],
            "child-src": ["'self'", "*.five9.com"],
            "frame-ancestors": [
                "'self'", 
                "*.hubspot.com"
            ]
        }
    },
    crossOriginResourcePolicy: {
        policy: "cross-origin"
    }
}));
app.use(hpp());

let sess: cookieSession = {
    secret: uuidv4(),
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 6 * 60 * 60 * 1000 },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_CONNECTION,
        ttl: 6 * 60 * 60 * 1000,
        autoRemove: 'native'
    })
};

if (httpsRequired) {
    sess.cookie.secure = true;
    sess.cookie.sameSite = 'none';
} 

app.set('trust proxy', 1)

app.use(session(sess));
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

const disposition = require('./routes/disposition');
app.use('/api/disposition', disposition);

const card = require('./routes/card');
app.use('/api/card-verify', card);

if (isProd) {
    app.use(express.static(path.join(__dirname, '..', '..', 'react-ui', 'build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '..', '..', 'react-ui', 'build','index.html'))
    );
}

app.listen(port, () => {
    return console.log(`Server is listening on port ${port}`);
});