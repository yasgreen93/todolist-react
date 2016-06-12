var TodoListApp = require('./TodoListApp.jsx').default;

ReactDOM.render(
  <TodoListApp url="/api/todos" updateUrl="/api/todos/update" deleteUrl="/api/todos/delete" pollInterval={2000}/>,
  document.getElementById('container')
);
