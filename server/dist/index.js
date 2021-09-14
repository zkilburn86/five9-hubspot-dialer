"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(morgan('tiny'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors());
const engagement = require('./routes/engagement');
app.use('/api/engagement', engagement);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'react-ui', 'build')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, '..', '..', 'react-ui', 'build', 'index.html')));
}
app.listen(port, () => {
    return console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map