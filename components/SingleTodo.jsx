var CompleteTodoButton = require('./CompleteTodoButton.jsx');
var DeleteTodoButton = require('./DeleteTodoButton.jsx');
var Draggable = ReactDraggable;

module.exports = React.createClass({
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
      <Draggable zIndex={100}>
        <li key={todo.id}>
          <p className="liText"><strong>Todo:</strong> {todo.text}</p>
          <p className="liText"><strong>Tag:</strong> {todo.tag}</p>
          <p className="liText"><strong>{checkCompleted(todo)}</strong></p>
          <p className="liText">{<CompleteTodoButton todo={todo} onTodoUpdate={this.props.onTodoUpdate}/>}</p>
          <p className="liText">{<DeleteTodoButton todo={todo} onTodoDelete={this.props.onTodoDelete}/>}</p>
        </li>
      </Draggable>
    );
  }
});
