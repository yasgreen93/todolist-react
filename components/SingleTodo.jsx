var CompleteTodoButton = require('./CompleteTodoButton.jsx');
var DeleteTodoButton = require('./DeleteTodoButton.jsx');
var Draggable = ReactDraggable;

module.exports = React.createClass({
  getInitialState: function () {
    return {
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0
      },
      controlledPosition: {
        x: -400, y: 200
      }
    };
  },
  handleDrag: function (e, ui) {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  },
  onStart: function() {
    this.setState({activeDrags: ++this.state.activeDrags});
  },
  onStop: function() {
    this.setState({activeDrags: --this.state.activeDrags});
  },
  render: function() {
    var dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    var deltaPosition = this.state;
    var controlledPosition = this.state;
    var todo = this.props.todo;
    var checkCompleted = function(todo) {
      return todo.completed ? "Completed!" : "Not completed...";
    };
    return (
      <Draggable zIndex={100} {...dragHandlers}>
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
            {<CompleteTodoButton todo={todo} onTodoUpdate={this.props.onTodoUpdate}/>}
          </div>
          <div id="liDeleteButton">
            {<DeleteTodoButton todo={todo} onTodoDelete={this.props.onTodoDelete}/>}
          </div>
        </li>
      </Draggable>
    );
  }
});
