var filestorage = require('./filestorage');
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/test')

mongoose.connection.once('open', function() {
  var input = fs.createReadStream('/home/will/Test.scala');

  console.log('storing file')
  filestorage.store('Test.scala', input,
    function(err) { 
      if (err != null) {
        console.error('failed ' + err);
        process.exit(1);
      } else {
        process.exit(0);
      }
    });
});
