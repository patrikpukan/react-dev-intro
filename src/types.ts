export type Todo = {
  id: number
  name: string
  completed: boolean
  description: string
  priority: 1 | 2 | 3 // 1 = low, 2 = medium, 3 = high
  userId: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

export type TodoCreate = {
  name: string
  description: string
  priority: 1 | 2 | 3
  userId: string
}

export type TodoUpdate = {
  id: number
  name?: string
  description?: string
  priority?: 1 | 2 | 3
  completed?: boolean
}

export type TodoToggle = Pick<Todo, 'id' | 'completed'>

export type TodoFilter = 'all' | 'completed' | 'pending'
