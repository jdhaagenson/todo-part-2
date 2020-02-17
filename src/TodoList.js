import React, { Component } from 'react';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.state.todos.map(todo => (
            <TodoItem
            handleClear = {todo =>
            this.state.handleClear(todo.id)}
            handleToggle={todo =>
            this.state.handleToggle(todo.id)}
            handleDelete = {todo =>
            this.state.handleDelete(todo.id)}
            title={todo.title}
            completed={todo.completed}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default TodoList