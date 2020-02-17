import React, { Component } from "react";
import "./index.css";
import TodoList from './TodoList.js';
import todosList from "./todos.json";
import {
  Route,
  NavLink
} from "react-router-dom"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: todosList,
      value: ""
    };

  }

  handleDelete = todoIdToDelete => {
    const newTodoList = this.props.state.todo.filter(
      todo => todo.id !== todoIdToDelete);
    this.setState({ todos: newTodoList });
  };

  handleCreate = (event) => {
    if (event.key === 'Enter') {
      const newTodoList = this.state.todo.slice();
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
    const newTodos = this.state.todo.slice();
    const newTodoList = newTodos.map(todo => {
      if (todo.id === todoIdToToggle) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
    this.setState({todos: newTodoList});
  };

  handleClearClick = () => {
    let todo = this.state.todos;
    todo = todo.filter(a => !a.completed);
    this.setState({ todos: todo });
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
            value={this.state.value}
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
