import './styles.css';
import { TodoList } from './class';
import './js/componentes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);
