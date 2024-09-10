const mongoose = require('mongoose');

const ipSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true
  },
  authorizedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AuthorizedIp', ipSchema);
