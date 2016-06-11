var TodoListApp = React.createClass({
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
  handleTodoUpdate: function(id) {
    var todos = this.state.data;
     $.ajax({
      url: this.props.updateUrl,
      dataType: 'json',
      type: 'POST',
      data: id,
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
        <h2 id="pageHeader">Todo List!</h2>
        <AddTodo onTodoSubmit={this.handleTodoSubmit} />
        <TodoList data={this.state.data} onTodoUpdate={this.handleTodoUpdate}/>
      </div>
    );
  }
});

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

var SingleTodo = React.createClass({
  render: function() {
    var update = this.props.onTodoUpdate;
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
            {<CompleteTodoButton todo={todo} onTodoUpdate={update}/>}
          </div>
        </li>
    );
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
      <form className="AddTodoForm" onSubmit={this.handleSubmit} id="addTodoForm">
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

var CompleteTodoButton = React.createClass({
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

var CompleteTodo = React.createClass({
  getInitialState: function() {
    return {id: this.props.id};
  },
  handleUpdate: function(e) {
    e.preventDefault();
    this.props.onTodoUpdate({id: e.target.name});
  },
  render: function() {
    var todo = this.props.todo;
    var id = todo.id;
    return (
        <input
          type="Submit"
          name={id}
          value="Complete Todo"
          id="completeTodo"
          readOnly
          onClick={this.handleUpdate}
        />
    );
  }
});

ReactDOM.render(
  <TodoListApp url="/api/todos" updateUrl="/api/todos/update" pollInterval={2000}/>,
  document.getElementById('container')
);
