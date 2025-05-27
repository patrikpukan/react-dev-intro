import { useTodoContext } from '../../hooks/useTodosContext'
import type { Todo } from '../../types'

type TodoItemProps = {
  todo: Todo
}
export const TodoItem = ({ todo }: TodoItemProps) => {
  const { deleteTodo, toggleTodo } = useTodoContext()
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
