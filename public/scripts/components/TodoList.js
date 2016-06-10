var TodoList = React.createClass({
  render: function() {
    var update = this.props.onTodoUpdate;
    var list = [];
    this.props.data.forEach(function(todo) {
      list.push(todo);
    });
    var reversedList = list.reverse();
    return (
      <ul className="Todos">
        {reversedList.map(function(todo) {
          return (
            <SingleTodo todo={todo} onTodoUpdate={update}/>
          );
        })}
      </ul>
    );
  }
});
