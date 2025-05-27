import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { todoApi } from '../api/todoApi'
import type { Todo } from '../types'
import { Spinner } from '../components/spinner'
import { Header } from '../components/header'

const TodoDetailPage = () => {
  const [todo, setTodo] = useState<Todo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const params = useParams()

  useEffect(() => {
    setLoading(true)

    todoApi
      .fetchTodo(Number(params.id))
      .then((data) => {
        setTodo(data)
        setError(false)
      })
      .catch((err) => {
        console.error('Failed to fetch todo:', err)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (error || !todo) {
    return (
      <div className="todo-detail-error">
        <p>Could not load todo item.</p>
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    )
  }
  return (
    <>
      <Header title="Todo Detail" subtitle="Here is detail of todo" />
      <div className="todo-detail">
        <div className="todo-detail-card">
          <h2>{todo.name}</h2>
          <div className="todo-detail-status">
            Status:{' '}
            <span className={todo.completed ? 'completed' : 'active'}>
              {todo.completed ? 'Completed' : 'Active'}
            </span>
          </div>
          <div className="todo-detail-status">
            Priority: <span className={'completed'}>{todo.priority}</span>
          </div>

          {todo.description && (
            <div className="todo-detail-description">
              <p>{todo.description}</p>
            </div>
          )}
        </div>

        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    </>
  )
}

export default TodoDetailPage
