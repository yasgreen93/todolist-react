var TodoListApp = require('./TodoListApp.jsx').default;

ReactDOM.render(
  <TodoListApp url="/api/todos" updateUrl="/api/todos/update" deleteUrl="/api/todos/delete" />,
  document.getElementById('container')
);
