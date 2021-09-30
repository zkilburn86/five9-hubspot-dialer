import express from 'express';
const router = express.Router();

const dispositionService = require('../services/disposition.service');

router.get('/', dispositionService.getDispositions);

module.exports = router