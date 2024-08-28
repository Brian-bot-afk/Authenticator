exports.isAuth = (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.redirect('/login');
    }
  };
  
  exports.isGuest = (req, res, next) => {
    if (!req.session.userId) {
      next();
    } else {
      res.redirect('/dashboard');
    }
  };