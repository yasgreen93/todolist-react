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
          className: "todoForm", 
          type: "text", 
          placeholder: "Add a Todo", 
          value: this.state.text, 
          onChange: this.handleTextChange}
        ), 
        React.createElement("input", {
          id: "addTodoTag", 
          className: "todoForm", 
          type: "text", 
          placeholder: "Tag your Todo", 
          value: this.state.tag, 
          onChange: this.handleTagChange}
        ), 
        React.createElement("input", {id: "addTodoSubmit", className: "buttons", type: "submit", value: "Add"})
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
    var id = this.props.todo.id;
    return (
        React.createElement("input", {
          type: "Submit", 
          name: id, 
          className: "buttons", 
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
    var button;
    var todo = this.props.todo;
    if(todo.completed === false) {
      button = React.createElement(CompleteTodo, {todo: todo, onTodoUpdate: this.props.onTodoUpdate});
    }
    return (
      React.createElement("span", null, 
        button
      )
    );
  }
});

},{"./CompleteTodo.jsx":2}],4:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  getInitialState: function() {
    return {id: this.props.id};
  },
  handleUpdate: function(e) {
    e.preventDefault();
    this.props.onTodoDelete({id: e.target.name});
  },
  render: function() {
    var id = this.props.todo.id;
    return (
        React.createElement("input", {
          type: "Submit", 
          name: id, 
          className: "buttons", 
          value: "Delete Todo", 
          id: "DeleteButton", 
          readOnly: true, 
          onClick: this.handleUpdate}
        )
    );
  }
});

},{}],5:[function(require,module,exports){
var CompleteTodoButton = require('./CompleteTodoButton.jsx');
var DeleteTodoButton = require('./DeleteTodoButton.jsx');
var Draggable = ReactDraggable;

module.exports = React.createClass({displayName: "exports",
  getInitialState: function () {
    return {
      deltaPosition: {
        x: 0, y: 0
      }
    };
  },
  handleDrag: function (e, ui) {
    var x = this.state.deltaPosition;
    var y = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  },
  render: function() {
    var todo = this.props.todo;
    var checkCompleted = function(todo) {
      return todo.completed ? "Completed!" : "Not completed...";
    };
    return (
      React.createElement(Draggable, {zIndex: 100}, 
        React.createElement("li", {key: todo.id}, 
          React.createElement("p", {className: "liText"}, React.createElement("strong", null, "Todo:"), " ", todo.text), 
          React.createElement("p", {className: "liText"}, React.createElement("strong", null, "Tag:"), " ", todo.tag), 
          React.createElement("p", {className: "liText"}, React.createElement("strong", null, checkCompleted(todo))), 
          React.createElement("p", {className: "liText"}, React.createElement(CompleteTodoButton, {todo: todo, onTodoUpdate: this.props.onTodoUpdate})), 
          React.createElement("p", {className: "liText"}, React.createElement(DeleteTodoButton, {todo: todo, onTodoDelete: this.props.onTodoDelete}))
        )
      )
    );
  }
});

},{"./CompleteTodoButton.jsx":3,"./DeleteTodoButton.jsx":4}],6:[function(require,module,exports){
var SingleTodo = require('./SingleTodo.jsx');

module.exports = React.createClass({displayName: "exports",
  render: function() {
    var updateTodo = this.props.onTodoUpdate;
    var deleteTodo = this.props.onTodoDelete;
    var list = [];
    this.props.data.forEach(function(todo) {
      list.push(todo);
    });
    var reversedList = list.reverse();
    return (
      React.createElement("ul", {className: "Todos"}, 
        reversedList.map(function(todo) {
          return (
            React.createElement(SingleTodo, {
              todo: todo, 
              onTodoUpdate: updateTodo, 
              onTodoDelete: deleteTodo}
            )
          );
        })
      )
    );
  }
});

},{"./SingleTodo.jsx":5}],7:[function(require,module,exports){
var AddTodo = require('./AddTodo.jsx');
var TodoList = require('./TodoList.jsx');

module.exports.default = TodoListApp = React.createClass({displayName: "TodoListApp",
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTodosFromServer();
  },
  loadTodosFromServer: function() {
    this.callAjax("getTodos", this.props.url, "GET")
  },
  handleTodoSubmit: function(todo) {
    var todos = this.state.data;
    var newTodos = todos.concat([todo]);
    this.setState({data: newTodos});
    this.callAjax(todo, this.props.url, "POST")
  },
  handleTodoUpdate: function(id) {
    this.callAjax(id, this.props.updateUrl, "POST")
  },
  handleTodoDelete: function(id) {
    this.callAjax(id, this.props.deleteUrl, "POST")
  },
  callAjax: function(reqData, url, reqType) {
    $.ajax({
      url: url, dataType: 'json', type: reqType, data: reqData,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: this.state.data});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      React.createElement("div", {className: "TodoTable"}, 
        React.createElement("section", {className: "fixedHeader"}, 
          React.createElement("h2", {id: "pageHeader"}, "Todo List!"), 
          React.createElement(AddTodo, {onTodoSubmit: this.handleTodoSubmit})
        ), 
        React.createElement("section", {className: "completedColumn"}, 
          React.createElement("h3", null, "Completed Todos")
        ), 
        React.createElement(TodoList, {
          data: this.state.data, 
          onTodoUpdate: this.handleTodoUpdate, 
          onTodoDelete: this.handleTodoDelete}
        )
      )
    );
  }
});

},{"./AddTodo.jsx":1,"./TodoList.jsx":6}],8:[function(require,module,exports){
var TodoListApp = require('./TodoListApp.jsx').default;

ReactDOM.render(
  React.createElement(TodoListApp, {url: "/api/todos", updateUrl: "/api/todos/update", deleteUrl: "/api/todos/delete"}),
  document.getElementById('container')
);

},{"./TodoListApp.jsx":7}]},{},[1,2,3,4,8,5,6,7]);
