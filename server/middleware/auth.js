const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No authentication token, access denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_portfolio_maker_2026_key';
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
  }
};

module.exports = auth;
