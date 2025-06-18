export type Todo = {
  id: number
  name: string
  completed: boolean
  description?: string
  priority: 1 | 2 | 3 // 1 = low, 2 = medium, 3 = high
  username: string
  createdAt: string
  updatedAt: string
}

export type TodoCreate = Omit<
  Todo,
  'id' | 'completed' | 'createdAt' | 'updatedAt'
>

export type TodoUpdate = Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>

export type TodoToggle = Pick<Todo, 'id' | 'completed'>

export type FilterType = 'all' | 'completed' | 'active'

export type SelectedTodos = Set<number>
