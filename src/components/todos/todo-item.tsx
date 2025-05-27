import type { Todo } from '../../types'

type TodoItemProps = {
  todo: Todo
}
export const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <li>
      <span>{todo.name}</span>
      <button>Delete</button>
    </li>
  )
}
