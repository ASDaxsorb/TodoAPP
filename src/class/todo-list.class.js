import { Todo } from './todo.class';

export class TodoList {
  constructor() {
    this.cargarLocalStorage();
  }

  nuevoTodo(todo) {
    this.todos.push(todo);
    this.guardarLocalStorage();
  }

  eliminarTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id != id);
    this.guardarLocalStorage();
  }

  marcarCompletado(id) {
    this.todos.forEach((todo) => {
      if (todo.id == id) {
        todo.completado = !todo.completado;
      }
    });
    this.guardarLocalStorage();
  }

  eliminarCompletados() {
    this.todos = this.todos.filter((todo) => !todo.completado);
  }

  guardarLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  cargarLocalStorage() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.todos = this.todos.map(Todo.fromJson);
    console.log(this.todos);
  }
}
