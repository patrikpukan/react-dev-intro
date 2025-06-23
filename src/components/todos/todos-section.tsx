import { useState, useMemo } from 'react'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error-message'
import { useTodosQuery } from '../../hooks/useTodosQuery'
import {
  useBulkDeleteTodos,
  useBulkToggleTodos,
} from '../../hooks/useBulkTodos'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Trash2, CheckSquare, Square } from 'lucide-react'
import type { TodoFilter } from '../../types'

export const TodosSection = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery()
  const { mutate: bulkDelete, isPending: isDeletingBulk } = useBulkDeleteTodos()
  const { mutate: bulkToggle, isPending: isTogglingBulk } = useBulkToggleTodos()

  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<TodoFilter>('all')
  const [selectedTodos, setSelectedTodos] = useState<number[]>([])

  const filteredTodos = useMemo(() => {
    if (!todos) return []

    let filtered = todos.filter((todo) =>
      todo.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    switch (filter) {
      case 'completed':
        filtered = filtered.filter((todo) => todo.completed)
        break
      case 'pending':
        filtered = filtered.filter((todo) => !todo.completed)
        break
      default:
        break
    }

    return filtered
  }, [todos, searchTerm, filter])

  const handleSelectTodo = (todoId: number) => {
    setSelectedTodos((prev) =>
      prev.includes(todoId)
        ? prev.filter((id) => id !== todoId)
        : [...prev, todoId],
    )
  }

  const handleSelectAll = () => {
    if (selectedTodos.length === filteredTodos.length) {
      setSelectedTodos([])
    } else {
      setSelectedTodos(filteredTodos.map((todo) => todo.id))
    }
  }

  const handleBulkDelete = () => {
    if (selectedTodos.length > 0) {
      bulkDelete(selectedTodos, {
        onSuccess: () => setSelectedTodos([]),
      })
    }
  }

  const handleBulkToggle = (completed: boolean) => {
    if (selectedTodos.length > 0) {
      bulkToggle(
        { ids: selectedTodos, completed },
        {
          onSuccess: () => setSelectedTodos([]),
        },
      )
    }
  }

  const selectedCount = selectedTodos.length
  const completedCount = filteredTodos.filter((todo) => todo.completed).length
  const pendingCount = filteredTodos.filter((todo) => !todo.completed).length

  if (error) {
    return <ErrorMessage message={error.message} onDismiss={refetch} />
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{filteredTodos.length}</div>
            <div className="text-sm text-muted-foreground">Total Todos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {completedCount}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {pendingCount}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>
            Manage your todos with search, filters, and bulk operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={filter}
              onValueChange={(value: TodoFilter) => setFilter(value)}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Todos</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-muted rounded-md">
              <Badge variant="secondary">{selectedCount} selected</Badge>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkToggle(true)}
                  disabled={isTogglingBulk}
                >
                  <CheckSquare className="h-4 w-4 mr-1" />
                  Mark Complete
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkToggle(false)}
                  disabled={isTogglingBulk}
                >
                  <Square className="h-4 w-4 mr-1" />
                  Mark Incomplete
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleBulkDelete}
                  disabled={isDeletingBulk}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Select All */}
          {filteredTodos.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                className="h-auto p-2"
              >
                {selectedTodos.length === filteredTodos.length ? (
                  <CheckSquare className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                <span className="ml-2">
                  {selectedTodos.length === filteredTodos.length
                    ? 'Deselect All'
                    : 'Select All'}
                </span>
              </Button>
            </div>
          )}

          {/* Todo List */}
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Spinner />
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              {searchTerm || filter !== 'all'
                ? 'No todos match your search criteria.'
                : 'No todos yet. Add one to get started!'}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isSelected={selectedTodos.includes(todo.id)}
                  onSelect={() => handleSelectTodo(todo.id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
