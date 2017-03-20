import React from 'react';
import { curry } from 'ramda';
import ReactDOM from 'react-dom';
import { todosLeft, filteredTodos } from '../utils';

const AddTodo = ({ state, update }) => (
  <header className="header">
    <h1>todos</h1>
    <form onSubmit={(e) => {e.preventDefault(); update.addTodo()}} >
      <input className="new-todo"
        onChange={e => update.updateText(e.target.value)}
        value={state.inputText}
        placeholder="What needs to be done?"
        autoFocus />
    </form>
  </header>
);

const Todo = ({ update, todo }) => (
    <li className={todo.complete ? "completed" : todo.isEditing ? "editing" : ""}>
      <div className="view">
        <input className="toggle"
          name="toggle"
          onClick={() => update.toggleTodo(todo.id)}
          type="checkbox"
          checked={todo.complete} />
        <label onDoubleClick={() => update.editTodo(todo.id)}>{todo.text}</label>
        <button className="destroy" onClick={() => update.removeTodo(todo.id)}></button>
      </div>
      {todo.isEditing && <input onBlur={() => update.toggleTodo(todo.id)}
                                onSubmit={() => update.toggleTodo(todo.id)}
                                onKeyDown={(e) => {
                                  if (e.which === 13) update.updateTodo(todo.id, e.target.value.trim());
                                }}
                                className="edit"
                                defaultValue={todo.text}
                                autoFocus
                                type="text" />
      }
    </li>
);

const TodoList = ({ todos, update }) => (
  <ul className="todo-list">
    {todos.map(todo => {
      return (<Todo key={todo.id} update={update} todo={todo} />)
    })}
  </ul>
);

const VisibleTodoList = ({ model }) => (
    <section className="main">
      <input className="toggle-all"
        type="checkbox"
        onChange={() => model.update.toggleAll()}
        checked={"isAllChecked"} />
      <TodoList todos={filteredTodos(model.state.filter, model.state.todos)} update={model.update} />
    </section>
);

const Link = ({ filter, children, model }) => (
  <a className={filter === model.state.filter ? 'selected' : ''}
    onClick={e => { e.preventDefault(); model.update.filter(filter) }}
    href="#" >
    {children}
  </a>
);

const Footer = ({ model }) => (
  <footer className="footer">
    <span className="todo-count">
      {todosLeft(model.state.todos)}
    </span>
    <ul className="filters">
      <li>
        <Link filter="all" model={model}>All</Link>
      </li>
      <li>
        <Link filter="active" model={model}>Active</Link>
      </li>
      <li>
        <Link filter="complete" model={model}>Completed</Link>
      </li>
    </ul>
    <button onClick={() => model.update.clearCompleted()} className="clear-completed">Clear completed</button>
  </footer>
);

const App = (model) => (
  <div>
    <section className="todoapp">
      <AddTodo state={model.state} update={model.update} />
      <VisibleTodoList model={model} />
      <Footer model={model} />
    </section>
    <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>Created by <a href="http://twitter.com/ronn_ross">Ronn Ross</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
);

App.render = curry((node, props) => ReactDOM.render(<App {...props} />, node));

export default App;
