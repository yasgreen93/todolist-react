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
    var sum = sumOfIdNums(todos);
    var newTodo = {
      id: parseFloat((sum + 0.7).toFixed(1)),
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
    todos.map(function(todo) {
      if(todo.id == requestedTodoId) {
        todo.completed = true;
      }
    });
    fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 4), function(err) {
      if(err) {
        console.error(err);
        process.exit(1);
      }
      res.json(todos);
    });
  });
});
app.post('/api/todos/delete', function(req, res) {
  fs.readFile(TODOS_FILE, function(err, data) {
    if(err) {
      console.log(err);
      process.exit(1);
    }
    var requestedTodoId = req.body.id;
    var todos = JSON.parse(data);
    todos.map(function(todo) {
      index = todos.indexOf(todo);
      if(todo.id == requestedTodoId) {
        todos.splice(index, 1);
      }
    });
    fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 4), function(err) {
      if(err) {
        console.error(err);
        process.exit(1);
      }
      res.json(todos);
    });
  });
});

var sumOfIdNums = function(todos) {
  var todoIds = [];
  todos.map(function(todo) {
    todoIds.push(todo.id);
  });
  return todoIds.reduce(add, 0);
};

var add = function(a ,b) {
  return a + b;
};

app.listen(app.get('port'), function() {
  console.log('SERVER STARTED AT http://localhost:' + app.get('port') + '/');
});
