function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className="todoItem">
      <div className="leftPart">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleTodo(todo.id)}
          className="checkbox"
        />

        <span className={todo.done ? "text done" : "text"}>
          {todo.text}
        </span>
      </div>

      <button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>
        ❌
      </button>
    </li>
  );
}

export default TodoItem; 