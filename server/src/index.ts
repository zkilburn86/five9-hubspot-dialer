import express from 'express';
const cors = require('cors');
require('dotenv').config()


const port = process.env.PORT || 8000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const engagement = require('./routes/engagement');
app.use('/engagement', engagement);

app.listen(port, () => {
    return console.log(`Server is listening on port ${port}`);
});