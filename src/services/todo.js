const baseURL = `${process.env.REACT_APP_API_URL}`

export const loadTodos = () => {
  return fetch(baseURL).then(res => res.json())
}

export const getTodo = (id) => {
  return fetch(`${baseURL}/${id}`).then(res => res.json())
}

// todo {title: '', completed: true/false}
export const createTodo = (todo) => {
  return fetch(`${baseURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json())
}

// todo {id: 1, title: '', completed: true/false}
export const updateTodo = (todo) => {
  return fetch(`${baseURL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json())
}

export const deleteTodo = (id) => {
  return fetch(`${baseURL}/${id}`, {
    method: 'DELETE'
  }).then(res => res.json())
}