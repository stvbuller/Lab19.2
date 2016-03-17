var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

var app = express();
var db = 'mongodb://localhost/todostuff';

var PORT = process.env.PORT || 3000;

mongoose.connect(db);
var Todo = require("./models/todo");

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

app.post('/api/todos', function(req, res) {
  var newTodo = new Todo({
    task: req.body.task,
    done: false
  });
  newTodo.save().then(function(dbTodo) {
    res.json(dbTodo);
  });
});

app.get('/api/todos', function(req, res) {
  Todo.find({}).exec().then(function(dbTodos) {
    res.json(dbTodos);
  });
});

app.put('/api/todos/:id', function(req, res) {
  Todo.update({_id: req.params.id}, {$set: req.body})
  .then(function(dbTodo) {
    res.json(dbTodo);
  });
});

app.delete('/api/todos/:id', function(req, res) {
  Todo.remove({_id: req.params.id})
  .then(function() {
    res.json({})
  });
});

app.listen(PORT, function() {
  console.log("listening on port", PORT);
});


