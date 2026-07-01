import { render, screen } from '@testing-library/react';
import TodoList from './components/TodoList';

test('renders todos inside a scrollable list container', () => {
  const todos = [
    { id: 1, text: 'First task', done: false, dueDate: '2030-01-01' },
    { id: 2, text: 'Second task', done: true }
  ];

  const { container } = render(
    <TodoList todos={todos} toggleTodo={() => {}} deleteTodo={() => {}} />
  );

  expect(screen.getByText('First task')).toBeInTheDocument();
  expect(screen.getByText(/До:/i)).toBeInTheDocument();
  expect(container.querySelector('.todoListScroll')).toBeInTheDocument();
  expect(container.querySelector('.todoList')).toBeInTheDocument();
});
