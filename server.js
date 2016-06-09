var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var TODOS_FILE = path.join(__dirname, 'todos.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
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

app.listen(app.get('port'), function() {
  console.log('SERVER STARTED AT http://localhost:' + app.get('port') + '/');
});
