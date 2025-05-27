import type { Todo } from '../../types'

type TodoItemProps = {
  todo: Todo
  deleteTodo: (todoId: number) => void
  toggleTodo: (todoId: number, completed: boolean) => void
}
export const TodoItem = ({ todo, deleteTodo, toggleTodo }: TodoItemProps) => {
  const handleDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  const handleToggleTodo = () => {
    toggleTodo(todo.id, todo.completed)
  }

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span>{todo.name}</span>
      <button onClick={handleDeleteTodo}>Delete</button>
      <button onClick={handleToggleTodo} className="toggle">
        {todo.completed ? 'Undo' : 'Completed'}
      </button>
    </li>
  )
}
