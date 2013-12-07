var mongoose = require('mongoose');

var fileMetadataSchema = mongoose.Schema({
  digest: String,
  digest_algorithm: String,
  description: String
});

module.exports = mongoose.model('FileMetadata', fileMetadataSchema)
