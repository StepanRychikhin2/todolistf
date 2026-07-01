import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <div className="todoListScroll">
      <ul className="todoList">
        <AnimatePresence mode="popLayout">
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="todoListItem"
            >
              <TodoItem
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default TodoList;