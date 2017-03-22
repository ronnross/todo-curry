import React from 'react';
import ReactDOM from 'react-dom';
import { todosLeft, filteredTodos, curry } from '../utils';

const AddTodo = ({model}) => (
  <header className="header">
    <h1>todos</h1>
    <form onSubmit={e => { e.preventDefault(); model.actions.addTodo() }} >
      <input className="new-todo"
        onChange={e => model.actions.updateText(e.target.value)}
        value={model.state.inputText}
        placeholder="What needs to be done?"
        autoFocus />
    </form>
  </header>
);

const Todo = ({todo, model}) => (
  <li className={todo.complete ? "completed" : todo.isEditing ? "editing" : ""}>
    <div className="view">
      <input className="toggle"
        name="toggle"
        onClick={() => model.actions.toggleTodo(todo.id)}
        type="checkbox"
        checked={todo.complete} />
      <label onDoubleClick={() => model.actions.editTodo(todo.id)}>{todo.text}</label>
      <button className="destroy" onClick={() => model.actions.removeTodo(todo.id)}></button>
    </div>
    {todo.isEditing && <input onBlur={() => model.actions.updateTodo(todo.id, todo.text)}
      onSubmit={() => model.actions.toggleTodo(todo.id)}
      onKeyDown={(e) => {
        if (e.which === 13) model.actions.updateTodo(todo.id, e.target.value.trim());
      }}
      className="edit"
      defaultValue={todo.text}
      autoFocus
      type="text" />
    }
  </li>
);

const TodoList = ({todos, model}) => (
  <ul className="todo-list">
    {todos.map(todo => {
      return (<Todo key={todo.id} todo={todo} model={model} />)
    })}
  </ul>
);

const VisibleTodoList = ({model}) => (
  <section className="main">
    <input className="toggle-all"
      type="checkbox"
      onChange={() => model.actions.toggleAll()}
      checked={"isAllChecked"} />
    <TodoList todos={filteredTodos(model.state.filter, model.state.todos)} model={model} />
  </section>
);

const Link = ({children, filter, model}) => (
  <a className={filter === model.state.filter ? 'selected' : ''}
    onClick={e => { e.preventDefault(); model.actions.filter(filter) }}
    href="#" >
    {children}
  </a>
);

const Footer = ({model}) => (
  <footer className="footer">
    <span className="todo-count">
      {todosLeft(model.state.todos)}
    </span>
    <ul className="filters">
      <li>
        <Link filter="all" model={model} >All</Link>
      </li>
      <li>
        <Link filter="active" model={model} >Active</Link>
      </li>
      <li>
        <Link filter="complete" model={model} >Completed</Link>
      </li>
    </ul>
    <button onClick={() => model.actions.clearCompleted()} className="clear-completed">Clear completed</button>
  </footer>
);

const App = ({model}) => (
  <div>
    <section className="todoapp">
      <AddTodo model={model} />
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
