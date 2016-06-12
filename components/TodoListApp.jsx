var AddTodo = require('./AddTodo.jsx');
var TodoList = require('./TodoList.jsx');

module.exports.default = TodoListApp = React.createClass({
  loadTodosFromServer: function() {
    $.ajax({
      url: this.props.url, dataType: 'json', cache: false,
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
      url: this.props.url, dataType: 'json',
      type: 'POST', data: todo,
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
      url: this.props.updateUrl, dataType: 'json',
      type: 'POST', data: id,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: todos});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTodoDelete: function(id) {
    var todos = this.state.data;
     $.ajax({
      url: this.props.deleteUrl, dataType: 'json',
      type: 'POST', data: id,
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
        <TodoList data={this.state.data} onTodoUpdate={this.handleTodoUpdate} onTodoDelete={this.handleTodoDelete}/>
      </div>
    );
  }
});
