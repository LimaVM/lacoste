const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: null },
  createdAt: { type: Date, default: Date.now } // Define a data de criação
});

module.exports = mongoose.model('Post', postSchema);
