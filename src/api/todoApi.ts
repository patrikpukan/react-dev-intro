import type { Todo, TodoToggle, TodoCreate, TodoUpdate } from '../types'

const API_URL = 'https://eli-workshop.vercel.app/api/users/pukp00/todos'

// Type for the raw API response
type ApiTodoResponse = {
  id: number
  name: string
  completed: boolean
  description?: string
  priority?: number
  username?: string
  createdAt?: string
  updatedAt?: string
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(`Api request failed ${response.status}`)
  }
  const data = await response.json()
  return data
}

// Simulate the new fields since the API might not support them
const enhanceTodo = (todo: ApiTodoResponse): Todo => {
  const now = new Date().toISOString()
  return {
    ...todo,
    username: todo.username || 'Anonymous',
    description: todo.description || '',
    priority: (todo.priority as 1 | 2 | 3) || 1,
    createdAt: todo.createdAt || now,
    updatedAt: todo.updatedAt || now,
  }
}

export const todoApi = {
  async fetchTodos() {
    const response = await fetch(API_URL)
    const todos = await handleResponse<ApiTodoResponse[]>(response)
    return todos.map(enhanceTodo)
  },

  async createTodo(newTodo: TodoCreate) {
    const body = {
      name: newTodo.name,
      description: newTodo.description,
      priority: newTodo.priority,
      username: newTodo.username,
    }
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const todo = await handleResponse<ApiTodoResponse>(response)
    return enhanceTodo(todo)
  },

  async updateTodo(id: number, updates: TodoUpdate) {
    const body = {
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const todo = await handleResponse<ApiTodoResponse>(response)
    return enhanceTodo(todo)
  },

  async deleteTodo(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return handleResponse(response)
  },

  async deleteTodos(ids: number[]) {
    // Since the API might not support bulk delete, we'll delete them one by one
    const deletePromises = ids.map((id) => this.deleteTodo(id))
    return Promise.all(deletePromises)
  },

  async toggleTodo({ id, completed }: TodoToggle) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed,
        updatedAt: new Date().toISOString(),
      }),
    })

    const todo = await handleResponse<ApiTodoResponse>(response)
    return enhanceTodo(todo)
  },

  async toggleTodos(ids: number[], completed: boolean) {
    // Bulk toggle operation
    const togglePromises = ids.map((id) => this.toggleTodo({ id, completed }))
    return Promise.all(togglePromises)
  },

  async fetchTodo(id: number) {
    const response = await fetch(`${API_URL}/${id}`)
    const todo = await handleResponse<ApiTodoResponse>(response)
    return enhanceTodo(todo)
  },
}
