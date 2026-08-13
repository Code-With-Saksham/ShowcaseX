const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const exporter = require('../utils/exporter');

// Get current user's portfolio
exports.getPortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.userId });
    if (!portfolio) {
      const user = await User.findById(req.user.userId);
      portfolio = new Portfolio({
        user: req.user.userId,
        title: user ? `${user.name}'s Portfolio` : 'My Portfolio',
        personal: {
          fullName: user ? user.name : '',
          username: user ? user.username : '',
          email: user ? user.email : '',
        },
      });
      await portfolio.save();
    }
    res.json({ success: true, portfolio });
  } catch (err) {
    console.error('getPortfolio error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching portfolio' });
  }
};

// Update or Save user's portfolio
exports.upsertPortfolio = async (req, res) => {
  try {
    const portfolioData = req.body;
    
    // Ensure user property matches authenticated user
    portfolioData.user = req.user.userId;
    portfolioData.updatedAt = Date.now();

    let portfolio = await Portfolio.findOneAndUpdate(
      { user: req.user.userId },
      { $set: portfolioData },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Portfolio saved successfully',
      portfolio,
    });
  } catch (err) {
    console.error('upsertPortfolio error:', err);
    res.status(500).json({ success: false, message: 'Failed to save portfolio data' });
  }
};

// Get public portfolio by username
exports.getPublicPortfolioByUsername = async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const portfolio = await Portfolio.findOne({ user: user._id, isPublic: true });
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found or set to private' });
    }

    res.json({ success: true, portfolio });
  } catch (err) {
    console.error('getPublicPortfolioByUsername error:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving public portfolio' });
  }
};

// Export Portfolio as ZIP Archive
exports.exportPortfolioZip = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.userId });
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    await exporter.generatePortfolioZip(portfolio, res);
  } catch (err) {
    console.error('exportPortfolioZip error:', err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Failed to generate portfolio ZIP package' });
    }
  }
};
