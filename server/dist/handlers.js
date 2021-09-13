"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.engagementHandler = exports.rootHandler = void 0;
const rootHandler = (_req, res) => {
    return res.send('API is working 🤓');
};
exports.rootHandler = rootHandler;
const engagementHandler = (req, res) => {
    console.log(req);
    return res.json({ created: true });
};
exports.engagementHandler = engagementHandler;
//# sourceMappingURL=handlers.js.map