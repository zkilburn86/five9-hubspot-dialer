import express from 'express';
import path from 'path';

require('dotenv').config();

const morgan = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 8000;

const app = express();
app.use(morgan('tiny'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const engagement = require('./routes/engagement');
app.use('/api/engagement', engagement);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve('build', 'index.html'))
    );
}

app.listen(port, () => {
    return console.log(`Server is listening on port ${port}`);
});