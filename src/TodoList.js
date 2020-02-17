import React, { Component } from 'react';
import TodoItem from './TodoItem.js'

class TodoList extends Component {
    render() {
      return (
        // <section className="main">
          <ul className="todo-list">
            {this.props.todos.map(todo => (
              <TodoItem
              handleClear = {todo =>
              this.props.handleClear(todo.id)}
              handleToggle={todo =>
              this.props.handleToggle(todo.id)}
              handleDelete = {todo =>
              this.props.handleDelete(todo.id)}
              title={todo.title}
              completed={todo.completed}
              />
            ))}
          </ul>
        // </section>
      );
    }
  }

export default TodoList