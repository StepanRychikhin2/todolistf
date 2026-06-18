export const getTodos = (username) => {
  const data = localStorage.getItem(`todos_${username}`);
  return data ? JSON.parse(data) : [];
};

export const saveTodos = (username, todos) => {
  localStorage.setItem(`todos_${username}`, JSON.stringify(todos));
};