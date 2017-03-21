export const todosLeft = (todos) => {
  const count = todos.filter(t => !t.complete).length
  return count === 1 ? `1 item left` : `${count} items left`
}

export const incId = arr => arr.length === 0 ? 1 : (arr[arr.length - 1].id + 1);

export const curry = (fn, ...params) => fn.length <= params.length ? fn(...params) : (...others) => curry(fn, ...params, ...others);

export const filteredTodos = (filter, todos) => {
  let filteredTodos = todos;
  if (filter === 'active') {
    filteredTodos = filteredTodos.filter(t => t.complete === false);
  } else if (filter === 'complete') {
    filteredTodos = filteredTodos.filter(t => t.complete === true);
  }

  return filteredTodos;
}
export const xhr = {
  get: (url, cb) => {
    setTimeout(() => {
      cb([
        "remote todo 1",
        "remote todo 2",
        "remote todo 3"
      ]);
    }, 1000);
  }
};
