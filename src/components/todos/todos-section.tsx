import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error-message'
import { useTodoContext } from '../../hooks/useTodosContext'

export const TodosSection = () => {
  const { isLoading, todos, error, refetch } = useTodoContext()
  return (
    <main>
      {error && <ErrorMessage message={error} onDismiss={refetch} />}
      <TodoForm />
      <div className="todo-container">
        <ul id="todo-list" className={isLoading === true ? 'isLoading' : ''}>
          {todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />
          })}
        </ul>
        {isLoading && todos.length === 0 && <Spinner />}
      </div>
    </main>
  )
}
