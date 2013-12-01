var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true}
});

userSchema.pre('save', function(next) {
  var user = this;
  
  if (!user.isModified('password')) {
    return next()
  }

  // New password, rehash it before storing it.
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Validate the password against the stored hash.
 */
userSchema.methods.validatePassword = function(password, callback) {
  return bcrypt.compare(password, this.password, function(err, isValid) {
    if (err) {
      return callback(err);
    }
    return callback(null, isValid);
  });
}

module.exports = mongoose.model('User', userSchema);

