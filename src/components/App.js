import React from 'react';
import { curry } from 'ramda';
import ReactDOM from 'react-dom';

const AddTodo = ({ model }) => {
  // console.log('model', model)
  const handleSubmit = (e) => {
    e.preventDefault();
    model.update.submitForm()
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

const Todo = ({ completed, text, id, isEditing }) => {
  // console.log(...todo)
  return (
    <li className={completed ? "completed" : isEditing ? "editing" : ""}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} />
        <label>{text}</label>
        <button className="destroy"></button>
      </div>
    </li>
  )
}

const TodoList = ({ todos }) => {
  // console.log('inlist ', todos);

  return (
    <ul className="todo-list">
      {todos.map(todo => {
        return (<Todo key={todo.id} {...todo} />)
      })}
    </ul>
  )
}

const VisibleTodoList = ({ todos }) => {
  // console.log('todos ', todos)

  return <section className="main">
    <input className="toggle-all" type="checkbox"
      onChange={() => "toggleAll(visibleTodos)"}
      checked={"isAllChecked"} />
    <TodoList todos={todos} />
  </section>
};

const Footer = ({ children }) => (
  <div>todo footer</div>
);

const App = (model) => (
  <div>
    <section className="todoapp">
      <AddTodo model={model} />
      <VisibleTodoList todos={model.todos} />
      <Footer />
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
