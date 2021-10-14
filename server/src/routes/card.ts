import express from 'express';
const router = express.Router();

const cardService = require('../services/card.service');

router.get('/', cardService.getCardVerify);

module.exports = router