"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    postEngagement: (req, res) => {
        console.log(req.body);
        res.status(200).json({ created: true });
        return;
    }
};
//# sourceMappingURL=engagement.service.js.map