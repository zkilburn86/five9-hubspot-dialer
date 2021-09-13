"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors());
const engagement = require('./routes/engagement');
app.use('/api/engagement', engagement);
app.listen(port, () => {
    return console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map