import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul>
      <AnimatePresence>
        {todos.map(todo => (
          <motion.div
            key={todo.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <TodoItem
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TodoList;