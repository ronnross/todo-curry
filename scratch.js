const AddTodo = (state) => (<div> {state.text}</div>);

const VisibleTodos = (state) => (<ul><li>{state.item}</li></ul>);

const App = ({children}) => (
  <div>
    <section className="todoapp">
      {children}
    </section>
    <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>Created by <a href="http://twitter.com/ronn_ross">Ronn Ross</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
);

function renderSiblings(...siblings) {
  return (state) => siblings.map((component) => component(state)).join('/n')
}

compose(
  App,
  renderSiblings(VisibleTodos,AddTodo)
)(state)
