export const todosLeft = (todos) => {
  const count = todos.filter(t => !t.complete).length
  return count === 1 ? `1 item left` : `${count} items left`
}

export const incId = arr => arr.length === 0 ? 1 : (arr[arr.length - 1].id + 1);

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
