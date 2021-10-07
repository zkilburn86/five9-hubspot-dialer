import express from 'express';
const router = express.Router();

const engagementService = require('../services/engagement.service');

router.get('/', engagementService.getEngagement);

module.exports = router