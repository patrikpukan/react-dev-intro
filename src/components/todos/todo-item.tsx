import { Link } from 'react-router'
import { Edit, Trash2, Clock, User } from 'lucide-react'
import type { Todo } from '../../types'
import { useTodoDelete } from '../../hooks/useTodoDelete'
import { useTodoToggle } from '../../hooks/useTodoToggle'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import {
  cn,
  formatDate,
  getPriorityColor,
  getPriorityLabel,
} from '../../lib/utils'

type TodoItemProps = {
  todo: Todo
  isSelected?: boolean
  onSelect?: (checked: boolean) => void
}

export const TodoItem = ({
  todo,
  isSelected = false,
  onSelect,
}: TodoItemProps) => {
  const { mutate: deleteTodo } = useTodoDelete()
  const { mutate: toggleTodo } = useTodoToggle()

  const handleDeleteTodo = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    deleteTodo(todo.id)
  }

  const handleToggleTodo = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleTodo({ id: todo.id, completed: !todo.completed })
  }

  const handleSelectChange = (checked: boolean) => {
    onSelect?.(checked)
  }

  const priorityColor = getPriorityColor(todo.priority)
  const priorityLabel = getPriorityLabel(todo.priority)

  return (
    <Card
      className={cn(
        'transition-all hover:shadow-md',
        isSelected && 'ring-2 ring-primary',
        `priority-${todo.priority}`,
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Selection Checkbox */}
          {onSelect && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={handleSelectChange}
              className="mt-1"
            />
          )}

          {/* Priority Indicator */}
          <div
            className={cn(
              'w-3 h-3 rounded-full mt-1.5 flex-shrink-0',
              `priority-dot-${todo.priority}`,
            )}
          />

          {/* Todo Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <Link to={`/todos/${todo.id}`} className="block group">
                  <h3
                    className={cn(
                      'font-medium group-hover:text-primary transition-colors',
                      todo.completed && 'line-through text-muted-foreground',
                    )}
                  >
                    {todo.name}
                  </h3>
                  {todo.description && (
                    <p
                      className={cn(
                        'text-sm text-muted-foreground mt-1 line-clamp-2',
                        todo.completed && 'line-through',
                      )}
                    >
                      {todo.description}
                    </p>
                  )}
                </Link>

                {/* Meta Information */}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {todo.username}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(todo.updatedAt)}
                  </div>
                </div>
              </div>

              {/* Status and Priority Badges */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge
                  variant={todo.completed ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {todo.completed ? 'Done' : 'Active'}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    'text-xs',
                    priorityColor === 'green' &&
                      'border-green-400 text-green-600',
                    priorityColor === 'yellow' &&
                      'border-yellow-400 text-yellow-600',
                    priorityColor === 'red' && 'border-red-400 text-red-600',
                  )}
                >
                  {priorityLabel}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3">
              <Button
                size="sm"
                variant={todo.completed ? 'outline' : 'default'}
                onClick={handleToggleTodo}
                className="h-8"
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </Button>
              <Link to={`/todos/${todo.id}/edit`}>
                <Button size="sm" variant="outline" className="h-8">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </Link>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDeleteTodo}
                className="h-8"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
