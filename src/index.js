// import React from 'react';
import App from './components/App';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

const render = App.render(document.getElementById('root'));
const incId = arr => arr.length === 0 ? 1 : (arr[arr.length - 1].id + 1);

let model = {
  inputText: "",
  todos: [
    // {
    //   id: 1,
    //   text: "some todo",
    //   completed: false,
    //   isEditing: false
    // }
  ],
  update: {
    updateText: (text) => {
      model.inputText = text;
      render(model);
    },
    addTodo: (val) => {
      model.todos.push({ id: incId(model.todos), text: model.inputText, complete: false, isEditing: false });
      model.inputText = "";
      render(model);
    },
    removeTodo: (id) => {
      model.todos = model.todos.filter(t => t.id !== id);
      render(model);
    },
    toggleTodo: (id) => {
      model.todos.forEach(t => {
        if (t.id === id ) t.complete = !t.complete
      });
      render(model);
    },
    clearCompleted: () => {
      model.todos = model.todos.filter(t => t.complete === false);
      render(model);
    },
    filter: (filterName) => {
      model.filter = filterName;
      render(model);
    }
  },
  filter: "all"
};

render(model);
