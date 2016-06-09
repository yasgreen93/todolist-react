var TodoListTable = React.createClass({
  loadTodosFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTodosFromServer();
    setInterval(this.loadTodosFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="TodoTable">
        <h2>Todo List!</h2>
        <AddTodo />
        <FilterTodo />
        <TodoList todos={this.state.data}/>
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
    return (
      <ul className="Todos">
        {list.map(function(todo, index) {
          return (
            <SingleTodo idNum={index} todo={todo}/>
          );
        })}
      </ul>
    );
  }
});

var SingleTodo = React.createClass({
  render: function() {
    var checkCompleted = function(todo) {
      return todo.completed === true ? "Completed!" : "Not completed...";
    };
    var todo = this.props.todo;
    var key = this.props.idNum;
    return (
      <div id={key}>
        <li key={key}>
          <strong>Todo:</strong> {todo.text}, <strong>Tag:</strong> {todo.tag}, <strong>{checkCompleted(todo)}</strong>
          {<CompleteTodoButton completed={todo.completed} id={key} />}
        </li>
      </div>

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

ReactDOM.render(
  <TodoListTable url="/api/todos" pollInterval={2000}/>,
  document.getElementById('container')
);
