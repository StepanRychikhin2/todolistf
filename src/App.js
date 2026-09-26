import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

const TODOS_KEY = 'todos'

function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(TODOS_KEY)
    if (savedTodos) return JSON.parse(savedTodos)

    // Move existing tasks from the previous per-user format to the new shared list.
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      const legacyTodos = localStorage.getItem(`todos_${user.username}`)
      if (legacyTodos) {
        const todos = JSON.parse(legacyTodos)
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
        return todos
      }
    }
  } catch {
    // Ignore invalid browser storage and start with an empty list.
  }
  return []
}

function App() {
  const [todos, setTodos] = useState(loadTodos)

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text, dueDate) => {
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text, done: false, dueDate: dueDate || null }
    ])
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const activeTodos = todos.filter(todo => !todo.done)
  const doneTodos = todos.filter(todo => todo.done)

  return (
    <main className="app">
      <header className="appHeader">
        <div>
          <p className="eyebrow">Твій простір для планів</p>
          <h1>Мої завдання<span>.</span></h1>
          <p className="subtleText">Упорядкуй справи та рухайся вперед крок за кроком.</p>
        </div>
        <div className="taskCount" aria-live="polite">
          <strong>{activeTodos.length}</strong>
          <span>{activeTodos.length === 1 ? 'завдання' : 'завдань'} залишилось</span>
        </div>
      </header>

      <section className="content" aria-label="Список завдань">
        <TodoForm addTodo={addTodo} />
        {todos.length > 0 && (
          <div className="listHeading">
            <h2>Список справ</h2>
            <span>{todos.length} загалом</span>
          </div>
        )}
        <TodoList
          todos={[...activeTodos, ...doneTodos]}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </section>
    </main>
  )
}

export default App
