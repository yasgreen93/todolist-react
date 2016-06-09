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
  handleTodoSubmit: function(todo) {
    var todos = this.state.data;
    var newTodos = todos.concat([todo]);
    this.setState({data: newTodos});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: todo,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: todos});
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
        <AddTodo onTodoSubmit={this.handleTodoSubmit}/>
        <TodoList data={this.state.data}/>
      </div>
    );
  }
});

var TodoList = React.createClass({
  render: function() {
    var list = [];
    this.props.data.forEach(function(todo) {
      list.push(todo);
    });
    return (
      <ul className="Todos">
        {list.map(function(todo) {
          return (
            <SingleTodo todo={todo}/>
          );
        })}
      </ul>
    );
  }
});

var SingleTodo = React.createClass({
  render: function() {
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
            {<CompleteTodoButton todo={todo} />}
          </div>
        </li>
    );
  }
});

var CompleteTodoButton = React.createClass({
  render: function() {
    var button;
    var todo = this.props.todo;
    var completed = todo.completed;
    if(completed === false) {
      button = <CompleteButton todo={todo}/>;
    }
    return (
      <span>
        {button}
      </span>
    );
  }
});

var CompleteButton = React.createClass({
  getInitialState: function() {
    return { complete: false };
  },
  handleChange: function() {
    this.setState({complete: !this.state.complete})
  },
  render: function() {
    var todo = this.props.todo;
    var id = todo.id;
    return <input
              type="Button"
              name={id}
              value="Complete Todo"
              id="completeButton"
              defaultChecked={this.props.complete}
              onChange={this.handleChange}
            />;
  }
});

var AddTodo = React.createClass({
  getInitialState: function() {
    return {text: '', tag: '', completed: false};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleTagChange: function(e) {
    this.setState({tag: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    var tag = this.state.tag.trim();
    var completed = false;
    if(!text || !tag) {
      return;
    }
    this.props.onTodoSubmit({text: text, tag: tag, completed: completed});
    this.setState({text: '', tag: ''});
  },
  render: function() {
    return (
      <form className="AddTodoForm" onSubmit={this.handleSubmit}>
        <input
          id="addTodoText"
          type="text"
          placeholder="Add a Todo"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input
          id="addTodoTag"
          type="text"
          placeholder="Tag your Todo"
          value={this.state.tag}
          onChange={this.handleTagChange}
        />
        <input id="addTodoSubmit" type="submit" value="Add" />
      </form>
    );
  }
});

ReactDOM.render(
  <TodoListTable url="/api/todos" pollInterval={2000}/>,
  document.getElementById('container')
);
