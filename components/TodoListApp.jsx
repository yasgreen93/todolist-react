var AddTodo = require('./AddTodo.jsx');
var TodoList = require('./TodoList.jsx');

module.exports.default = TodoListApp = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTodosFromServer();
  },
  loadTodosFromServer: function() {
    this.callAjax("getTodos", this.props.url, "GET")
  },
  handleTodoSubmit: function(todo) {
    var todos = this.state.data;
    var newTodos = todos.concat([todo]);
    this.setState({data: newTodos});
    this.callAjax(todo, this.props.url, "POST")
  },
  handleTodoUpdate: function(id) {
    this.callAjax(id, this.props.updateUrl, "POST")
  },
  handleTodoDelete: function(id) {
    this.callAjax(id, this.props.deleteUrl, "POST")
  },
  callAjax: function(reqData, url, reqType) {
    $.ajax({
      url: url, dataType: 'json', type: reqType, data: reqData,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: this.state.data});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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
