
express = require('express')

app = express()

app.get('/', function(req, res) {
    res.send("hello world");
});

var port = 8000;
app.listen(port);
console.log('SafeServer started on port ' + port);

