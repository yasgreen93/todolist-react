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
    var reqData = todo;
    this.callAjax(reqData, this.props.url)
  },
  handleTodoUpdate: function(id) {
    var reqId = id
    this.callAjax(reqId, this.props.updateUrl)
  },
  handleTodoDelete: function(id) {
    var reqId = id
    this.callAjax(reqId, this.props.deleteUrl)
  },
  callAjax: function(reqData, url) {
    var todos = this.state.data;
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: reqData,
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
        <section className="fixedHeader">
          <h2 id="pageHeader">Todo List!</h2>
          <AddTodo onTodoSubmit={this.handleTodoSubmit} />
        </section>
        <section className="completedColumn">
          <h3>Completed Todos</h3>
        </section>
        <TodoList data={this.state.data} onTodoUpdate={this.handleTodoUpdate} onTodoDelete={this.handleTodoDelete}/>
      </div>
    );
  }
});
