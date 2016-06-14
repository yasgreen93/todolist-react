var SingleTodo = require('./SingleTodo.jsx');

module.exports = React.createClass({
  render: function() {
    var updateTodo = this.props.onTodoUpdate;
    var deleteTodo = this.props.onTodoDelete;
    var list = [];
    this.props.data.forEach(function(todo) {
      list.push(todo);
    });
    var reversedList = list.reverse();
    return (
      <ul className="Todos">
        {reversedList.map(function(todo) {
          return (
            <SingleTodo
              todo={todo}
              onTodoUpdate={updateTodo}
              onTodoDelete={deleteTodo}
            />
          );
        })}
      </ul>
    );
  }
});
