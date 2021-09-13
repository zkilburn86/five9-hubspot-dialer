import express from 'express';
const router = express.Router();

const engagementService = require('../services/engagement.service');

router.post('/', engagementService.postEngagement);

module.exports = router