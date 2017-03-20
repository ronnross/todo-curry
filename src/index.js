// import React from 'react';
import App from './components/App';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import { incId } from './utils';
const render = App.render(document.getElementById('root'));

let model = {
  inputText: "",
  todos: [
    // {
    //   id: 1,
    //   text: "some todo",
    //   complete: false,
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
    updateTodo: (id, text) => {
      console.log('in update', id, text);
      model.todos.forEach(t => {
        if (t.id === id) {
          t.isEditing = !t.isEditing;
          t.text = text;
        }
      });
      render(model);
    },
    removeTodo: (id) => {
      model.todos = model.todos.filter(t => t.id !== id);
      render(model);
    },
    editTodo: (id) => {
      console.log('need to edit ', id);
      model.todos.forEach(t => {
        if (t.id === id) t.isEditing = !t.isEditing;
      });
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
    },
    toggleAll: () => {
      model.todos.forEach(t => {
        t.complete = !t.complete;
      });
      render(model);
    }
  },
  filter: "all"
};

// call the xhr request
render(model);
