var CompleteTodo = require('./CompleteTodo.jsx');

module.exports = React.createClass({
  render: function() {
    var button;
    var todo = this.props.todo;
    if(todo.completed === false) {
      button = <CompleteTodo todo={todo} onTodoUpdate={this.props.onTodoUpdate}/>;
    }
    return (
      <span>
        {button}
      </span>
    );
  }
});
