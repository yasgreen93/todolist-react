var CompleteTodoButton = require('./CompleteTodoButton.jsx');
var DeleteTodoButton = require('./DeleteTodoButton.jsx');

module.exports = React.createClass({
  render: function() {
    var deleteTodo = this.props.onTodoDelete;
    var updateTodo = this.props.onTodoUpdate;
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
          <div id="liuUpdateButton">
            {<CompleteTodoButton todo={todo} onTodoUpdate={updateTodo}/>}
          </div>
          <div id="liDeleteButton">
            {<DeleteTodoButton todo={todo} onTodoDelete={deleteTodo}/>}
          </div>
        </li>
    );
  }
});
