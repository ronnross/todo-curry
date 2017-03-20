export const todosLeft = (todos) => {
  const count = todos.filter(t => !t.complete).length
  return count === 1 ? `1 item left` : `${count} items left`
}

export const incId = arr => arr.length === 0 ? 1 : (arr[arr.length - 1].id + 1);

