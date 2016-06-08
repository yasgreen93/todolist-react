var TodoListTable = React.createClass({
  render: function() {
    return (
      <div className="TodoTable">
        <h2>Todo List!</h2>
        <AddTodo />
        <FilterTodo />
        <TodoList todos={this.props.todos}/>
      </div>
    );
  }
});

var AddTodo = React.createClass({
  render: function() {
    return (
      <form className="AddTodoForm">
        <input id="addTodoText" type="text" placeholder="Add a Todo" />
        <input id="addTodoSubmit" type="submit" value="Add" />
      </form>
    );
  }
});

var FilterTodo = React.createClass({
  render: function() {
    return (
      <form className="FilterTodoForm">
        <input id="filterTodoText" type="text" placeholder="Filter by a tag" />
        <input id="filterTodoSubmit" type="submit" value="Filter" />
      </form>
    );
  }
});

var TodoList = React.createClass({
  render: function() {
    var list = [];
    this.props.todos.forEach(function(todo) {
      list.push(todo);
    });
    var checkCompleted = function(todo){
      return todo.completed === true ? "Completed!" : "Not completed...";
    };
    return (
      <ul className="Todos">
        {list.map(function(todo, index) {
          return (
            <div id={index}>
              <li key={index}>
                <strong>Todo:</strong> {todo.text}, <strong>Tag:</strong> {todo.tag}, <strong>{checkCompleted(todo)}</strong>
                {<CompleteTodoButton completed={todo.completed} id={index} />}
              </li>
            </div>
          );
        })}
      </ul>
    );
  }
});

var CompleteTodoButton = React.createClass({
  render: function() {
    var button;
    if(this.props.completed === false) {
      button = <CompleteButton />;
    }
    return (
      <span>
        {button}
      </span>
    );
  }
});

var CompleteButton = React.createClass({
  render: function() {
    return <input type="submit" value="Complete Todo" id="completeButton"/>;
  }
});

var TODOS = [
  {text: "walk dog", tag: "dog", completed: true },
  {text: "do homework", tag: "school", completed: false },
  {text: "wmake packed lunch", tag: "food", completed: true },
  {text: "make dinner", tag: "food", completed: false }
];

ReactDOM.render(
  <TodoListTable todos={TODOS}/>,
  document.getElementById('container')
);
