import { useState } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Clock, Edit, ExternalLink, Trash2, User } from 'lucide-react'
import type { Todo } from '../../types'
import { useTodoDelete } from '../../hooks/useTodoDelete'
import { useTodoToggle } from '../../hooks/useTodoToggle'
import { useTodoUpdate } from '../../hooks/useTodoUpdate'

type TodoItemProps = {
  todo: Todo
  isSelected: boolean
  onSelect: () => void
}

const getPriorityColor = (priority: 1 | 2 | 3) => {
  switch (priority) {
    case 1:
      return 'bg-green-100 text-green-800 border-green-200'
    case 2:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 3:
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getPriorityText = (priority: 1 | 2 | 3) => {
  switch (priority) {
    case 1:
      return 'Low'
    case 2:
      return 'Medium'
    case 3:
      return 'High'
    default:
      return 'Unknown'
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

export const TodoItem = ({ todo, isSelected, onSelect }: TodoItemProps) => {
  const { mutate: deleteTodo, isPending: isDeleting } = useTodoDelete()
  const { mutate: toggleTodo, isPending: isToggling } = useTodoToggle()
  const { mutate: updateTodo, isPending: isUpdating } = useTodoUpdate()

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: todo.name,
    description: todo.description || '',
    priority: todo.priority,
  })

  const handleDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  const handleToggleTodo = () => {
    toggleTodo({ id: todo.id, completed: !todo.completed })
  }

  const handleUpdateTodo = () => {
    updateTodo(
      {
        id: todo.id,
        name: editForm.name,
        description: editForm.description,
        priority: editForm.priority,
        completed: todo.completed,
      },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false)
        },
      },
    )
  }

  const handleEditFormChange = (field: string, value: string | number) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              className="mt-1"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className={`font-medium text-lg ${
                    todo.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {todo.name}
                </h3>
                <Badge
                  variant="outline"
                  className={`text-xs ${getPriorityColor(todo.priority)}`}
                >
                  {getPriorityText(todo.priority)} Priority
                </Badge>
                {todo.completed && (
                  <Badge variant="secondary" className="text-xs">
                    Completed
                  </Badge>
                )}
              </div>

              {todo.description && (
                <p
                  className={`text-sm text-muted-foreground mb-2 ${
                    todo.completed ? 'line-through' : ''
                  }`}
                >
                  {todo.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                {todo.userId && (
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {todo.userId}
                  </div>
                )}
                {todo.updatedAt && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(todo.updatedAt)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              size="sm"
              variant={todo.completed ? 'outline' : 'default'}
              onClick={handleToggleTodo}
              disabled={isToggling}
            >
              {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </Button>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Todo</DialogTitle>
                  <DialogDescription>
                    Make changes to your todo item.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      value={editForm.name}
                      onChange={(e) =>
                        handleEditFormChange('name', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={editForm.description}
                      onChange={(e) =>
                        handleEditFormChange('description', e.target.value)
                      }
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-priority">Priority</Label>
                    <Select
                      value={editForm.priority.toString()}
                      onValueChange={(value) =>
                        handleEditFormChange('priority', parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Low Priority</SelectItem>
                        <SelectItem value="2">Medium Priority</SelectItem>
                        <SelectItem value="3">High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleUpdateTodo}
                    disabled={isUpdating}
                    className="w-full"
                  >
                    {isUpdating ? 'Updating...' : 'Update Todo'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Link to={`/todos/${todo.id}`}>
              <Button size="sm" variant="outline">
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </Button>
            </Link>

            <Button
              size="sm"
              variant="destructive"
              onClick={handleDeleteTodo}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
