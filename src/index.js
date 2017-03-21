import App from './components/App';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import { incId, xhr } from './utils';
const render = App.render(document.getElementById('root'));

const dispatch = (fn, ...payload) => {
  const result = fn(...payload);
  render(result);
}

let model = {
  state: {
    inputText: "",
    filter: "all",
    todos: []
  },
  update: {
    updateText: (text) => {
      model.state.inputText = text;
      return model;
    },
    addTodo: (val) => {
      const todoText = val ? val : model.state.inputText;
      model.state.todos.push({ id: incId(model.state.todos), text: todoText, complete: false, isEditing: false });
      model.state.inputText = "";
      return model;
    },
    updateTodo: (id, text) => {
      model.state.todos.forEach(t => {
        if (t.id === id) {
          t.isEditing = !t.isEditing;
          t.text = text;
        }
      });
      return model;
    },
    removeTodo: (id) => {
      model.state.todos = model.state.todos.filter(t => t.id !== id);
      return model;
    },
    editTodo: (id) => {
      model.state.todos.forEach(t => {
        if (t.id === id) t.isEditing = !t.isEditing;
      });
      return model;
    },
    toggleTodo: (id) => {
      model.state.todos.forEach(t => {
        if (t.id === id ) t.complete = !t.complete
      });
      return model;
    },
    clearCompleted: () => {
      model.state.todos = model.state.todos.filter(t => t.complete === false);
      return model;
    },
    filter: (filterName) => {
      model.state.filter = filterName;
      return model;
    },
    toggleAll: () => {
      model.state.todos.forEach(t => {
        t.complete = !t.complete;
      });
      return model;
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
  },
  dispatch: dispatch
};

model.effects.getRemoteTodos();
render(model);
