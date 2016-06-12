/** @jsx React.DOM */
var TodoListApp = require('./TodoListApp.jsx').default;

ReactDOM.render(
  <TodoListApp url="/api/todos" updateUrl="/api/todos/update" pollInterval={2000}/>,
  document.getElementById('container')
);
