var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
var stylus = require('stylus')

var routes = require('./routes')
var User = require('./models/user')

var app = express()

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'Get a better secret'}));

/**
  * Middleware for requiring authentication.
  * If there is no user associated with the current session,
  * we redirect to the login page.
  */
function requiresAuthentication(req, res, next) {
  var user = req.session.user;
  if (!user) {
    res.redirect('/login');
  } else {
    next();
  }
}

// Routes
app.get('/', requiresAuthentication, routes.index);

// Login
app.get('/login', routes.login);
app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var user = User.findOne({username: username}, function(err, user) {
    if (err) {
      req.send('Error logging in ' + err);
    }

    if (user) {
      user.validatePassword(password, function(err, isValid) {
        if (err) {
          console.error('Error logging in ' + err);
        }

        if (isValid) {
          console.log('logged in user ' + user);
          req.session.user = user;
          res.redirect('/');
        } else {
          console.log('failed login attempt for user ' + user);
          res.redirect('/login');
        }
      
      });
    }
  });
});

// REST API routes

function start_server() {
  var port = 8000;
  console.log('Starting server on port ' + port);
  app.listen(port);
  console.log('SafeServer started');
}

// Connect to the database.
console.log('Connecting to MongoDB instance')
mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error:'))
db.once('open', function(){
  User.findOne({username: 'admin'}, function(err, user){
    if (err) {
      console.error("Failed to query for administrator");
    } else {
      if (!user) {
        console.log("No admin user detected, creating default");
        admin = new User({username: 'admin', password: 'admin123'});
        admin.save();
      } else {
        admin = user;
        console.log("Found administrative user");
      }
    }
  });
  start_server();
});
