const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const auth = require('../middleware/auth');

router.get('/me', auth, portfolioController.getPortfolio);
router.put('/me', auth, portfolioController.upsertPortfolio);
router.get('/export', auth, portfolioController.exportPortfolioZip);
router.get('/public/:username', portfolioController.getPublicPortfolioByUsername);

module.exports = router;
