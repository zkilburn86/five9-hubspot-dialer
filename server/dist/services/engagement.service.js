"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
module.exports = {
    postEngagement: (req, res) => {
        updateEngagement(req.body);
        res.status(200).json({ created: true });
        return;
    }
};
const updateEngagement = (requestBody) => {
    axios_1.default.patch('https://api.hubapi.com/engagements/v1/engagements/' + requestBody.engagementId, {
        metadata: {
            status: requestBody.status,
            fromNumber: requestBody.fromNumber
        }
    }, {
        params: {
            hapikey: process.env.HAPI_KEY
        }
    }).then((response) => {
        if (response.status !== 200) {
            console.error('Unable to update engagement - Id: ' + requestBody.engagementId);
        }
    }).catch((err) => {
        console.error(err);
    });
};
//# sourceMappingURL=engagement.service.js.map