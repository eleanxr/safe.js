/**
 * Uses MongoDB's GridFS to store files in the database.
 */
var mongoose = require('mongoose');

var GridStore = mongoose.mongo.GridStore;
var Grid = mongoose.mongo.Grid;
var ObjectID = mongoose.mongo.BSONPure.ObjectID;

exports.store = function(name, stream, callback) {
  var gs = new GridStore(mongoose.connection.db, name, 'w', {
    root: 'data'
  });
  console.log('opening GridFS file');
  gs.open(function(err, file) {
    if (err) {
      callback(err);
    } else {
      console.log('GridFS file opened for writing.')
      stream.on('data', function(chunk) {
        console.log('handling chunk');
        file.write(chunk);
      });
      stream.on('end', function() {
        console.log('closing stream');
        file.close()
        callback(null);
      });
    }
  });
}
