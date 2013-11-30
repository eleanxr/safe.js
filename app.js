
express = require('express')
routes = require('./routes')

app = express()

// Middleware

// User facing routes
app.get('/', routes.index);
app.get('/login', routes.login);

// REST API routes

var port = 8000;
app.listen(port);
console.log('SafeServer started on port ' + port);

