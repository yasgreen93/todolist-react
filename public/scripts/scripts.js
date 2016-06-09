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
        <FilterTodo />
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

ReactDOM.render(
  <TodoListTable url="/api/todos" pollInterval={2000}/>,
  document.getElementById('container')
);
