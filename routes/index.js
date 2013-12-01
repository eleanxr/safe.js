exports.index = function(req, res) {
    res.render('index', {user: req.session.user});
}

exports.login = function(req, res) {
  res.render('login');
}

