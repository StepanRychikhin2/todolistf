import { useState, useEffect } from 'react'
import { getTodos, saveTodos } from './utils/storage'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')

    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)
      setTodos(getTodos(user.username))
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      saveTodos(currentUser.username, todos)
    }
  }, [currentUser, todos])

  const handleLogin = () => {
    if (!username.trim()) return

    const user = { username }

    localStorage.setItem('currentUser', JSON.stringify(user))

    setCurrentUser(user)
    setTodos(getTodos(username))
    setUsername('')
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setTodos([])
  }

  const addTodo = (text, dueDate) => {
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text, done: false, dueDate: dueDate || null }
    ])
  }

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  if (!currentUser) {
    return (
      <div className="app authCard">
        <h2>Ласкаво просимо</h2>
        <p className="subtleText">Увійди, щоб керувати своїм особистим планером</p>

        <input
          className="todoInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введи ім'я"
        />

        <button className="primaryBtn" onClick={handleLogin}>
          Увійти
        </button>
      </div>
    )
  }

  const activeTodos = todos.filter(t => !t.done)
  const doneTodos = todos.filter(t => t.done)

  return (
    <div className="app">
      <div className="appHeader">
        <div>
          <p className="eyebrow">Преміальний планер</p>
          <h1>Todo Luxe</h1>
          <p className="subtleText">Користувач: {currentUser.username}</p>
        </div>
        <button className="ghostBtn" onClick={logout}>
          Вийти
        </button>
      </div>

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