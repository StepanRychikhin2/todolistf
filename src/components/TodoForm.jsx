import { useState } from "react";

function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTodo(text, dueDate || null);
    setText("");
    setDueDate("");
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        className="todoInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Нова задача"
      />

      <input
        className="todoDateInput"
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button className="primaryBtn" type="submit">
        Додати
      </button>
    </form>
  );
}

export default TodoForm;