module.exports = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      errorMsg: 'You need to login first',
    });
  }
  next();
};
