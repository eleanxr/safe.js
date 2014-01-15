var express = require('express');
var User = require('./models/user');

/**
 * Middleware to require basic http authentication for a route.
 */
exports.requireBasicHttp = express.basicAuth(function(username, password, callback) {
  var user = User.findOne({username: username}, function(err, user) {
    if (err) {
      callback(err);
    } else if (user) {
      user.validatePassword(password, function(err, isValid) {
        if (err) {
          callback(err);
        } else {
          if (isValid) {
            callback(null, user);
          } else {
            callback(null, null);
          }
        }
      });
    } else {
      callback(null, null);
    }
  });
});


