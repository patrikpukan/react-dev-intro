import type { Todo, TodoToggle, TodoCreate, TodoUpdate } from '../types'

const API_URL = 'https://eli-workshop.vercel.app/api/users/pukp00/todos'

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

export const todoApi = {
  async fetchTodos() {
    const response = await fetch(API_URL)
    return handleResponse<Todo[]>(response)
  },
  async createTodo(newTodo: TodoCreate) {
    const body = {
      name: newTodo.name,
      description: newTodo.description,
      priority: newTodo.priority,
      userId: newTodo.userId,
      completed: false,
    }
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return handleResponse<Todo>(response)
  },
  async updateTodo(updateData: TodoUpdate) {
    const body = {
      ...updateData,
    }
    const response = await fetch(`${API_URL}/${updateData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return handleResponse<Todo>(response)
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
  async bulkDeleteTodos(ids: number[]) {
    const deletePromises = ids.map((id) => this.deleteTodo(id))
    return Promise.all(deletePromises)
  },
  async bulkToggleTodos(ids: number[], completed: boolean) {
    const togglePromises = ids.map((id) => this.toggleTodo({ id, completed }))
    return Promise.all(togglePromises)
  },
  async toggleTodo({ id, completed }: TodoToggle) {
    const body = {
      completed,
    }
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return handleResponse<Todo>(response)
  },
  async fetchTodo(id: number) {
    const response = await fetch(`${API_URL}/${id}`)
    return handleResponse<Todo>(response)
  },
}
