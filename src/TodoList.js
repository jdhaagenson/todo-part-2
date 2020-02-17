import React, { Component } from 'react';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
            handleClear = {event => this.props.handleClear(todo.id)}
            handleToggle={event => this.props.handleToggle(todo.id)}
            handleDelete = {event => this.props.handleDelete(todo.id)}
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