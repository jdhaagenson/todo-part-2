import React, { Component } from "react";
import "./index.css";
import TodoList from './TodoList.js';
import "./todos.json";
import {
  Route,
  NavLink
} from "react-router-dom"

class App extends Component {
  state = {
    todos: TodoList,
    value: ""
  };

  handleDelete = todoIdToDelete => {
    const newTodoList = this.props.state.todos.filter(
      todo => todo.id !== todoIdToDelete);
    this.setState({ todos: newTodoList });
  };

  handleCreate = (event) => {
    if (event.key === 'Enter') {
      const newTodoList = this.props.state.todos.slice();
      newTodoList.push({
        userId: 1,
        id: Math.floor(Math.random()*1000000),
        title: this.state.value,
        completed: false
      });
      this.setState({ todos: newTodoList, value: "" });
    }
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  handleToggle = todoIdToToggle => {
    const newTodoList = this.props.state.todos.map(todo => {
      if (todo.id === todoIdToToggle) {
        const newTodo = {...todo };
        newTodo.completed = !newTodo.completed
        return newTodo;
      }
      return todo;
    });
    this.setState({todos: newTodoList});
  };

  handleClearClick = () => {
    let todos = this.props.state.todos;
    todos = todos.filter(a => !a.completed);
    this.setState({ todos: todos });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            // autofocus
            onKeyDown={this.props.handleCreate}
            onChange={this.props.handleChange}
            value={this.props.state.value}
          />
        </header>
        <Route
          exact
          path="/"
          render={()=>(
            <TodoList
            handleToggle={this.handleToggle}
            handleDelete = {this.handleDelete}
            todos={this.state.todos} />
          )}/>
          <Route
            path="/active"
            render={()=>(
              <TodoList
              handleToggle={this.handleToggle}
              handleDelete={this.handleDelete}
              todos={this.props.state.todos.filter(todo=>todo.completed === false)}/>
            )}/>
          <Route
            path="/completed"
            render={()=>(
              <TodoList
                handleToggle={this.handleToggle}
                handleDelete={this.handleDelete}
                todos={this.props.state.todos.filter(todo=>todo.completed === true)}/>
            )}/>
        <footer className="footer">
          <span className="todo-count">
            <strong>{this.state.todos.length}</strong> item(s) left
          </span>
          <ul className="filters">
            <li>
              <NavLink exact to="/"activeClassName="selected">All</NavLink>
            </li>
            <li>
              <NavLink exact to="/active"activeClassName="selected">Active</NavLink>
            </li>
            <li>
              <NavLink exact to="/completed"activeClassName="selected">Completed</NavLink>
            </li>
          </ul>
          <button onClick={this.handleClearClick} className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}



export default App;
