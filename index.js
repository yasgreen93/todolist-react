import TodoListApp from './components/TodoListApp.jsx';
import AddTodo from './components/AddTodo.jsx';
import TodoList from './components/TodoList.jsx';
import CompleteTodoButton from './components/CompleteTodoButton.jsx';
import CompleteTodo from './components/CompleteTodo.jsx';
import SingleTodo from './components/SingleTodo.jsx';

ReactDOM.render(
  <TodoListApp url="/api/todos" updateUrl="/api/todos/update" pollInterval={2000}/>,
  document.getElementById('container')
);
