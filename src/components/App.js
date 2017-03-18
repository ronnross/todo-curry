import React from 'react';
import { curry } from 'ramda';
import ReactDOM from 'react-dom';

const AddTodo = ({ model }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    model.update.addTodo()
  }
  let input;
  return <header className="header">
    <h1>todos</h1>
    <form onSubmit={handleSubmit} >
      <input className="new-todo"
        ref={node => { input = node }}
        onChange={e => model.update.updateText(input.value)}
        value={model.inputText}
        placeholder="What needs to be done?"
        autoFocus />
    </form>
  </header>
};

const Todo = ({ update, completed, text, id, isEditing }) => {
  // console.log('update ', update);
  return (
    <li className={completed ? "completed" : isEditing ? "editing" : ""}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} />
        <label>{text}</label>
        <button className="destroy" onClick={() => update.removeTodo(id)}></button>
      </div>
    </li>
  )
}

const TodoList = ({ todos, update }) => {
  // console.log('todolist ', update);

  return (
    <ul className="todo-list">
      {todos.map(todo => {
        return (<Todo key={todo.id} update={update} {...todo} />)
      })}
    </ul>
  )
}

const VisibleTodoList = ({ model }) => {
  // console.log('todos ', model)
  return (
    <section className="main">
      <input className="toggle-all"
        type="checkbox"
        onChange={() => "toggleAll(visibleTodos)"}
        checked={"isAllChecked"} />
      <TodoList todos={model.todos} update={model.update} />
    </section>
  )
};

const Footer = ({ model }) => {
  const length = model.todos.length;

  return (
    <footer className="footer">
      <span className="todo-count">
        { length }
        { length <= 1 ? " item left" : " items left" }
      </span>
      <ul className="filters">
        <li>
          <a href="#">All</a>
        </li>
        <li>
          <a href="#">Active</a>
        </li>
        <li>
          <a href="#">Completed</a>
        </li>
      </ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
};

const App = (model) => (
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
