import { Todo } from '../class';
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnClearCompleted = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
     <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
       <div class="view">
 	<input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
 	<label>${todo.tarea}</label>
 	<button class="destroy"></button>
       </div>
       <input class="edit" value="Create a TodoMVC template">
     </li>`;

  const div = document.createElement('div');
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);
  return div.firstElementChild;
};

txtInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    const todo = new Todo(txtInput.value);
    todoList.nuevoTodo(todo);
    crearTodoHtml(todo);
    txtInput.value = '';
  }
});

const deleteElement = (id) => {
  const todoElement = divTodoList.querySelector(`[data-id="${id}"]`);
  todoList.eliminarTodo(id);
  divTodoList.removeChild(todoElement);
};

const toggleElement = (id) => {
  todoList.marcarCompletado(id);
  const todoElement = divTodoList.querySelector(`[data-id="${id}"]`);
  todoElement.classList.toggle('completed');
};

divTodoList.addEventListener('click', (event) => {
  const todoId =
    event.target.parentElement.parentElement.getAttribute('data-id');
  const inputElement = event.target.localName;

  const listeners = {
    input: () => {
      toggleElement(todoId);
    },
    button: () => {
      deleteElement(todoId);
    },
    default: () => {
      console.log('Not valid input');
    },
  };

  (listeners[inputElement] || listeners['default'])();
});

btnClearCompleted.addEventListener('click', () => {
  todoList.todos.forEach((todo) => {
    if (todo.completado) {
      deleteElement(todo.id);
    }
  });

  // todoList.eliminarCompletados();
  // const completedList = divTodoList.querySelectorAll('.completed');
  // for (let completed of completedList) {
  //   divTodoList.removeChild(completed);
  // }
});

const filterBy = (callback) => {
  const todos = divTodoList.children;
  for (const todo of todos) {
    if (callback(todo)) {
      todo.classList.remove('hidden');
      continue;
    }
    todo.classList.add('hidden');
  }
};

ulFiltros.addEventListener('click', (event) => {
  const filter = event.target.text;
  if (!filter) {
    return;
  }
  const selected = ulFiltros.querySelector('.selected');
  selected.classList.remove('selected');
  event.target.classList.add('selected');

  const listeners = {
    Todos: () => filterBy(() => true),
    Pendientes: () => {
      filterBy((todo) => !todo.className.includes('completed'));
    },
    Completados: () => {
      filterBy((todo) => todo.className.includes('completed'));
    },
    default: () => console.log('Invalid Listener'),
  };

  (listeners[filter] || listeners['default'])();
});
