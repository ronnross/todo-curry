import App from './components/App';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import { incId, xhr } from './utils';
const render = App.render(document.getElementById('root'));

let model = {
  state: {
    inputText: "",
    filter: "all",
    todos: []
  },
  update: {
    updateText: (text) => {
      model.state.inputText = text;
      render(model);
    },
    addTodo: (val) => {
      const todoText = val ? val : model.state.inputText;
      model.state.todos.push({ id: incId(model.state.todos), text: todoText, complete: false, isEditing: false });
      model.state.inputText = "";
      render(model);
    },
    updateTodo: (id, text) => {
      console.log('in update', id, text);
      model.state.todos.forEach(t => {
        if (t.id === id) {
          t.isEditing = !t.isEditing;
          t.text = text;
        }
      });
      render(model);
    },
    removeTodo: (id) => {
      model.state.todos = model.state.todos.filter(t => t.id !== id);
      render(model);
    },
    editTodo: (id) => {
      console.log('need to edit ', id);
      model.state.todos.forEach(t => {
        if (t.id === id) t.isEditing = !t.isEditing;
      });
      render(model);
    },
    toggleTodo: (id) => {
      model.state.todos.forEach(t => {
        if (t.id === id ) t.complete = !t.complete
      });
      render(model);
    },
    clearCompleted: () => {
      model.state.todos = model.todos.filter(t => t.complete === false);
      render(model);
    },
    filter: (filterName) => {
      model.state.filter = filterName;
      render(model);
    },
    toggleAll: () => {
      model.state.todos.forEach(t => {
        t.complete = !t.complete;
      });
      render(model);
    }
  },
  effects: {
    getRemoteTodos: () => {
      xhr.get('/todos', (data) => {
        data.forEach(t => {
          model.update.addTodo(t)
        });
      });
    }
  }
};

// model.effects.getRemoteTodos();
render(model);
