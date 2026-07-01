import { useEffect, useState } from "react";

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!todo.dueDate || todo.done) return;

    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [todo.done, todo.dueDate]);

  const deadline = todo.dueDate
    ? new Date(todo.dueDate.includes("T") ? todo.dueDate : `${todo.dueDate}T23:59:59`).getTime()
    : null;

  const diff = deadline ? deadline - now : null;

  const countdownText = diff !== null && diff > 0
    ? `${Math.floor(diff / (1000 * 60 * 60 * 24))} дн. ${Math.floor((diff / (1000 * 60 * 60)) % 24)} год. ${Math.floor((diff / (1000 * 60)) % 60)} хв.`
    : null;

  const dueDateLabel = todo.dueDate
    ? new Date(todo.dueDate.includes("T") ? todo.dueDate : `${todo.dueDate}T00:00:00`).toLocaleString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : null;

  return (
    <div className={`todoItem ${todo.done ? "done" : ""}`}>
      <div className="leftPart">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleTodo(todo.id)}
          className="checkbox"
        />

        <div className="taskContent">
          <span className={todo.done ? "text done" : "text"}>
            {todo.text}
          </span>

          <div className="taskMeta">
            {dueDateLabel && (
              <span className="metaBadge">До: {dueDateLabel}</span>
            )}

            {!todo.done && dueDateLabel && countdownText && (
              <span className="metaBadge accent">Залишилось: {countdownText}</span>
            )}

            {!todo.done && dueDateLabel && !countdownText && (
              <span className="metaBadge overdue">Прострочено</span>
            )}

            {!todo.done && dueDateLabel && !countdownText && (
              <span className="overdueNotice">Час сплив для завдання: {todo.text}</span>
            )}

            {todo.done && (
              <span className="metaBadge completed">Виконано</span>
            )}
          </div>
        </div>
      </div>

      <button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>
        ✕
      </button>
    </div>
  );
}

export default TodoItem;