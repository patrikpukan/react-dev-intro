import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import { Plus, Search, Trash2, Check, X } from 'lucide-react'
import { useTodosQuery } from '../hooks/useTodosQuery'
import {
  useBulkTodoDelete,
  useBulkTodoToggle,
} from '../hooks/useBulkTodoActions'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Checkbox } from '../components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Spinner } from '../components/spinner'
import { ErrorMessage } from '../components/error-message'
import { TodoItem } from '../components/todos/todo-item'
import type { FilterType, SelectedTodos } from '../types'

const TodoListPage = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery()
  const { mutate: deleteTodos, isPending: isDeleting } = useBulkTodoDelete()
  const { mutate: toggleTodos, isPending: isToggling } = useBulkTodoToggle()

  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [selectedTodos, setSelectedTodos] = useState<SelectedTodos>(new Set())

  const filteredTodos = useMemo(() => {
    if (!todos) return []

    return todos.filter((todo) => {
      const matchesSearch = todo.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesFilter =
        filter === 'all' ||
        (filter === 'completed' && todo.completed) ||
        (filter === 'active' && !todo.completed)

      return matchesSearch && matchesFilter
    })
  }, [todos, searchQuery, filter])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTodos(new Set(filteredTodos.map((todo) => todo.id)))
    } else {
      setSelectedTodos(new Set())
    }
  }

  const handleSelectTodo = (todoId: number, checked: boolean) => {
    const newSelected = new Set(selectedTodos)
    if (checked) {
      newSelected.add(todoId)
    } else {
      newSelected.delete(todoId)
    }
    setSelectedTodos(newSelected)
  }

  const handleBulkDelete = () => {
    if (selectedTodos.size === 0) return
    deleteTodos(Array.from(selectedTodos), {
      onSuccess: () => setSelectedTodos(new Set()),
    })
  }

  const handleBulkToggle = (completed: boolean) => {
    if (selectedTodos.size === 0) return
    toggleTodos(
      { ids: Array.from(selectedTodos), completed },
      {
        onSuccess: () => setSelectedTodos(new Set()),
      },
    )
  }

  const selectedCount = selectedTodos.size
  const allSelected =
    filteredTodos.length > 0 && selectedTodos.size === filteredTodos.length

  if (error) {
    return <ErrorMessage message={error.message} onDismiss={refetch} />
  }

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Todo List</h1>
          <p className="text-muted-foreground">Manage your tasks efficiently</p>
        </div>
        <Link to="/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Todo
          </Button>
        </Link>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search todos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={filter}
              onValueChange={(value: FilterType) => setFilter(value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Todos</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {filteredTodos.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm">
                  Select All ({selectedCount} selected)
                </span>
              </div>

              {selectedCount > 0 && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkToggle(true)}
                    disabled={isToggling}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark Complete
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkToggle(false)}
                    disabled={isToggling}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Mark Incomplete
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleBulkDelete}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete Selected
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Todo List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Todos</span>
            <Badge variant="outline">
              {filteredTodos.length} {filter === 'all' ? 'total' : filter}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery
                ? 'No todos match your search.'
                : 'No todos yet. Create your first one!'}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isSelected={selectedTodos.has(todo.id)}
                  onSelect={(checked) => handleSelectTodo(todo.id, checked)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TodoListPage
