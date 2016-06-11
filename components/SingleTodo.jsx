import React from 'react';
import ReactDOM from 'react-dom';

var SingleTodo = React.createClass({
  render: function() {
    var update = this.props.onTodoUpdate;
    var todo = this.props.todo;
    var checkCompleted = function(todo) {
      return todo.completed ? "Completed!" : "Not completed...";
    };
    return (
        <li key={todo.id}>
          <div id="liText">
            <strong>Todo:</strong> {todo.text}
          </div>
          <div id="liTag">
            <strong>Tag:</strong> {todo.tag}
          </div>
          <div id="liComplete">
            <strong>{checkCompleted(todo)}</strong>
          </div>
          <div id="liButton">
            {<CompleteTodoButton todo={todo} onTodoUpdate={update}/>}
          </div>
        </li>
    );
  }
});
