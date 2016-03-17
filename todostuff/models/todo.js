var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  task: String,
  done: Boolean
});

module.exports = mongoose.model('Todo', todoSchema);
