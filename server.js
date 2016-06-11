var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config.js');

var app = express();
var compiler = webpack(config);


var TODOS_FILE = path.join(__dirname, 'todos.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(webpackMiddleware(compiler));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: true}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/todos', function(req, res) {
  fs.readFile(TODOS_FILE, function(err, data) {
    if(err) {
      console.log(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/todos', function(req, res) {
  fs.readFile(TODOS_FILE, function(err, data) {
    if(err) {
      console.log(err);
      process.exit(1);
    }
    var todos = JSON.parse(data);
    var newTodo = {
      id: todos.length + 1,
      text: req.body.text,
      tag: req.body.tag,
      completed: JSON.parse(req.body.completed)
    };
    todos.push(newTodo);
    fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 4), function(err) {
      if(err) {
        console.error(err);
        process.exit(1);
      }
      res.json(todos);
    });
  });
});

app.post('/api/todos/update', function(req, res) {
  fs.readFile(TODOS_FILE, function(err, data) {
    if(err) {
      console.log(err);
      process.exit(1);
    }
    var requestedTodoId = req.body.id;
    var todos = JSON.parse(data);
    todos[requestedTodoId -1].completed = true;
    fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 4), function(err) {
      if(err) {
        console.error(err);
        process.exit(1);
      }
      res.json(todos);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('SERVER STARTED AT http://localhost:' + app.get('port') + '/');
});
