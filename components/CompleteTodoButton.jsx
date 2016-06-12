var CompleteTodo = require('./CompleteTodo.jsx');

module.exports = React.createClass({
  render: function() {
    var update = this.props.onTodoUpdate;
    var button;
    var todo = this.props.todo;
    var completed = todo.completed;
    if(completed === false) {
      button = <CompleteTodo todo={todo} onTodoUpdate={update}/>;
    }
    return (
      <span>
        {button}
      </span>
    );
  }
});
