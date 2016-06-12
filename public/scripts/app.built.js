(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return {text: '', tag: '', completed: false};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleTagChange: function(e) {
    this.setState({tag: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    var tag = this.state.tag.trim();
    var completed = false;
    if(!text || !tag) {
      return;
    }
    this.props.onTodoSubmit({text: text, tag: tag, completed: completed});
    this.setState({text: '', tag: ''});
  },
  render: function() {
    return (
      React.createElement("form", {className: "AddTodoForm", onSubmit: this.handleSubmit, id: "addTodoForm"}, 
        React.createElement("input", {
          id: "addTodoText", 
          type: "text", 
          placeholder: "Add a Todo", 
          value: this.state.text, 
          onChange: this.handleTextChange}
        ), 
        React.createElement("input", {
          id: "addTodoTag", 
          type: "text", 
          placeholder: "Tag your Todo", 
          value: this.state.tag, 
          onChange: this.handleTagChange}
        ), 
        React.createElement("input", {id: "addTodoSubmit", type: "submit", value: "Add"})
      )
    );
  }
});

},{}],2:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return {id: this.props.id};
  },
  handleUpdate: function(e) {
    e.preventDefault();
    this.props.onTodoUpdate({id: e.target.name});
  },
  render: function() {
    var todo = this.props.todo;
    var id = todo.id;
    return (
        React.createElement("input", {
          type: "Submit", 
          name: id, 
          value: "Complete Todo", 
          id: "CompleteTodo", 
          readOnly: true, 
          onClick: this.handleUpdate}
        )
    );
  }
});

},{}],3:[function(require,module,exports){
var CompleteTodo = require('./CompleteTodo.jsx');

module.exports = React.createClass({displayName: "exports",
  render: function() {
    var update = this.props.onTodoUpdate;
    var button;
    var todo = this.props.todo;
    var completed = todo.completed;
    if(completed === false) {
      button = React.createElement(CompleteTodo, {todo: todo, onTodoUpdate: update});
    }
    return (
      React.createElement("span", null, 
        button
      )
    );
  }
});

},{"./CompleteTodo.jsx":2}],4:[function(require,module,exports){
var CompleteTodoButton = require('./CompleteTodoButton.jsx');

module.exports = React.createClass({displayName: "exports",
  render: function() {
    var update = this.props.onTodoUpdate;
    var todo = this.props.todo;
    var checkCompleted = function(todo) {
      return todo.completed ? "Completed!" : "Not completed...";
    };
    return (
        React.createElement("li", {key: todo.id}, 
          React.createElement("div", {id: "liText"}, 
            React.createElement("strong", null, "Todo:"), " ", todo.text
          ), 
          React.createElement("div", {id: "liTag"}, 
            React.createElement("strong", null, "Tag:"), " ", todo.tag
          ), 
          React.createElement("div", {id: "liComplete"}, 
            React.createElement("strong", null, checkCompleted(todo))
          ), 
          React.createElement("div", {id: "liButton"}, 
            React.createElement(CompleteTodoButton, {todo: todo, onTodoUpdate: update})
          )
        )
    );
  }
});

},{"./CompleteTodoButton.jsx":3}],5:[function(require,module,exports){
var SingleTodo = require('./SingleTodo.jsx');

module.exports = React.createClass({displayName: "exports",
  render: function() {
    var update = this.props.onTodoUpdate;
    var list = [];
    this.props.data.forEach(function(todo) {
      list.push(todo);
    });
    var reversedList = list.reverse();
    return (
      React.createElement("ul", {className: "Todos"}, 
        reversedList.map(function(todo) {
          return (
            React.createElement(SingleTodo, {todo: todo, onTodoUpdate: update})
          );
        })
      )
    );
  }
});

},{"./SingleTodo.jsx":4}],6:[function(require,module,exports){
var AddTodo = require('./AddTodo.jsx');
var TodoList = require('./TodoList.jsx');

module.exports.default = TodoListApp = React.createClass({displayName: "TodoListApp",
  loadTodosFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTodoSubmit: function(todo) {
    var todos = this.state.data;
    var newTodos = todos.concat([todo]);
    this.setState({data: newTodos});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: todo,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: todos});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTodoUpdate: function(id) {
    var todos = this.state.data;
     $.ajax({
      url: this.props.updateUrl,
      dataType: 'json',
      type: 'POST',
      data: id,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: todos});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTodosFromServer();
    setInterval(this.loadTodosFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      React.createElement("div", {className: "TodoTable"}, 
        React.createElement("h2", {id: "pageHeader"}, "Todo List!"), 
        React.createElement(AddTodo, {onTodoSubmit: this.handleTodoSubmit}), 
        React.createElement(TodoList, {data: this.state.data, onTodoUpdate: this.handleTodoUpdate})
      )
    );
  }
});

},{"./AddTodo.jsx":1,"./TodoList.jsx":5}],7:[function(require,module,exports){
var TodoListApp = require('./TodoListApp.jsx').default;

ReactDOM.render(
  React.createElement(TodoListApp, {url: "/api/todos", updateUrl: "/api/todos/update", pollInterval: 2000}),
  document.getElementById('container')
);

},{"./TodoListApp.jsx":6}]},{},[1,2,3,7,4,5,6]);
