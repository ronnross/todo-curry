// import React from 'react';
import App from './components/App';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

const render = App.render(document.getElementById('root'));
const incId = arr => (arr[arr.length - 1].id + 1);

let model = {
  inputText: "",
  todos: [
    { id: 1,
      text: "some todo",
      completed: false,
      isEditing: false
    }
  ],
  update: {
    updateText: (text) => {
      model.inputText = text;
      render(model);
    },
    submitForm: (val) => {
      model.todos.push({id: incId(model.todos), text: model.inputText, complete: false, isEditing: false});
      model.inputText = "";
      render(model);
    }
  },
  filter: "none"
};

render(model);
