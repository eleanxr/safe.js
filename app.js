
var express = require('express')
var mongoose = require('mongoose')
var routes = require('./routes')
var user = require('./models/user')

var app = express()

// Middleware

// User facing routes
app.get('/', routes.index);
app.get('/login', routes.login);

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
  var User = user.User;
  User.find({username: 'admin'}, function(err, admins){
    if (err) {
      console.error("Failed to query for administrator");
    } else {
      if (admins.length == 0) {
        console.log("No admin user detected, creating default");
        admin = new User({username: 'admin', password: 'admin'});
        admin.save();
      } else {
        admin = admins[0];
        console.log('Found administrative user');
      }
    }
  });
  start_server();
});
