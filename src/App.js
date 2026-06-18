import { useState, useEffect } from 'react'
import { getTodos, saveTodos } from './utils/storage'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [todos, setTodos] = useState([])

  // 🔹 завантаження користувача
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')

    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)
      setTodos(getTodos(user.username))
    }
  }, [])

  // 🔹 збереження задач
  useEffect(() => {
    if (currentUser) {
      saveTodos(currentUser.username, todos)
    }
  }, [todos])

  // 🔐 login
  const handleLogin = () => {
    if (!username.trim()) return

    const user = { username }

    localStorage.setItem('currentUser', JSON.stringify(user))

    setCurrentUser(user)
    setTodos(getTodos(username))
    setUsername('')
  }

  // 🚪 logout
  const logout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setTodos([])
  }

  // ➕ add todo
  const addTodo = (text) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, done: false }
    ])
  }

  // ✔ toggle done
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    )
  }

  // ❌ delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // ❗ якщо не залогінений
  if (!currentUser) {
    return (
      <div className="app">
        <h2>Вхід</h2>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введи ім'я"
        />

        <button onClick={handleLogin}>
          Увійти
        </button>
      </div>
    )
  }

  // 🟢 правильний порядок без sort (без стрибків)
  const activeTodos = todos.filter(t => !t.done)
  const doneTodos = todos.filter(t => t.done)

  return (
    <div className="app">

      <h1>Todo List</h1>
      <p>Користувач: {currentUser.username}</p>

      <button onClick={logout}>
        Вийти
      </button>

      <TodoForm addTodo={addTodo} />

      <TodoList
        todos={[...activeTodos, ...doneTodos]}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />

    </div>
  )
}

export default App