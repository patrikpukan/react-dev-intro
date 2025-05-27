import { useEffect, useState } from 'react'
import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import type { Todo } from '../../types'
import { todoApi } from '../../api/todoApi'

export const TodosSection = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchTodos = async () => {
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <main>
      <TodoForm />
      <div className="todo-container">
        <ul id="todo-list">
          {todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />
          })}
        </ul>
      </div>
    </main>
  )
}
