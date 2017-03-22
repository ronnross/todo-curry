import App from './components/App';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import { incId, xhr, objMap, forEachObj } from './utils';

const render = App.render(document.getElementById('root'));

const todo = {
  state: {
    inputText: "",
    filter: "all",
    todos: []
  },
  reducers: {
    updateText: (model, text) => {
      model.inputText = text;
      return model;
    },
    addTodo: (model, val) => {
      const todoText = val ? val : model.inputText;
      model.todos.push({ id: incId(model.todos), text: todoText, complete: false, isEditing: false });
      model.inputText = "";
      return model;
    },
    updateTodo: (model, id, text) => {
      model.todos.forEach(t => {
        if (t.id === id) {
          t.isEditing = !t.isEditing;
          t.text = text;
        }
      });
      return model;
    },
    removeTodo: (model, id) => {
      model.todos = model.todos.filter(t => t.id !== id);
      return model;
    },
    editTodo: (model, id) => {
      model.todos.forEach(t => {
        if (t.id === id) t.isEditing = !t.isEditing;
      });
      return model;
    },
    toggleTodo: (model, id) => {
      model.todos.forEach(t => {
        if (t.id === id ) t.complete = !t.complete
      });
      return model;
    },
    clearCompleted: (model) => {
      model.todos = model.todos.filter(t => t.complete === false);
      return model;
    },
    filter: (model, filterName) => {
      model.filter = filterName;
      return model;
    },
    toggleAll: (model) => {
      model.todos.forEach(t => {
        t.complete = !t.complete;
      });
      return model;
    }
  },
  effects: {
    getRemoteTodos: ({state, actions}) => {
      xhr.get('/todos', (data) => {
        data.forEach(t => {
          actions.addTodo(t)
        });
      });
    }
  },
  subscriptions: {
    excitingStuff: actions => {
      setTimeout(() => actions.getRemoteTodos(), 3000)
    }
  }
};

const start = ({state, reducers, effects, subscriptions}) => {
  const internalState = {}
  const internalActions = Object.assign(objMap((effect) => (...payload) => effect({state: internalState, actions: internalActions}, ...payload), effects)
                                      , objMap((reducer) => (...payload) => reducerDispatch(reducer, ...payload), reducers))

  function reducerDispatch (fn, ...payload) {
    Object.assign(internalState, fn(state, ...payload))
    render({model: {state: internalState, actions: internalActions}})
  }

  reducerDispatch((state) => state, state)
  forEachObj((subscription) => subscription(internalActions), subscriptions)

  return internalActions
}

// const todoActions =
start(todo);
// todoActions.getRemoteTodos();