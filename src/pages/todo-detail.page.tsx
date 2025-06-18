import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router'
import { ArrowLeft, Edit, Trash2, Clock, User, Save, X } from 'lucide-react'
import { useTodoQuery } from '../hooks/useTodoQuery'
import { useTodoUpdate } from '../hooks/useTodoUpdate'
import { useTodoDelete } from '../hooks/useTodoDelete'
import { useTodoToggle } from '../hooks/useTodoToggle'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Spinner } from '../components/spinner'
import {
  cn,
  formatDate,
  getPriorityColor,
  getPriorityLabel,
} from '../lib/utils'
import type { TodoUpdate } from '../types'

const TodoDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { data: todo, isError, isLoading } = useTodoQuery()
  const { mutate: updateTodo, isPending: isUpdating } = useTodoUpdate()
  const { mutate: deleteTodo, isPending: isDeleting } = useTodoDelete()
  const { mutate: toggleTodo, isPending: isToggling } = useTodoToggle()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<TodoUpdate>({})

  useEffect(() => {
    // Check if we're on the edit route
    if (location.pathname.endsWith('/edit')) {
      setIsEditing(true)
    }
  }, [location.pathname])

  useEffect(() => {
    // Set form data when todo is loaded and we're editing
    if (todo && isEditing && !formData.name) {
      setFormData({
        name: todo.name,
        description: todo.description,
        priority: todo.priority,
        username: todo.username,
      })
    }
  }, [todo, isEditing, formData.name])

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-2xl py-8">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    )
  }

  if (isError || !todo || !id) {
    return (
      <div className="container mx-auto max-w-2xl py-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">
              Could not load todo item.
            </p>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const priorityColor = getPriorityColor(todo.priority)
  const priorityLabel = getPriorityLabel(todo.priority)

  const handleEdit = () => {
    setFormData({
      name: todo.name,
      description: todo.description,
      priority: todo.priority,
      username: todo.username,
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (!formData.name?.trim()) return

    updateTodo(
      { id: Number(id), updates: formData },
      {
        onSuccess: () => {
          setIsEditing(false)
          // If we're on the edit route, navigate back to detail view
          if (location.pathname.endsWith('/edit')) {
            navigate(`/todos/${id}`)
          }
        },
      },
    )
  }

  const handleCancel = () => {
    setFormData({})
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(Number(id), {
        onSuccess: () => navigate('/'),
      })
    }
  }

  const handleToggle = () => {
    toggleTodo({ id: Number(id), completed: !todo.completed })
  }

  const handleInputChange = (
    field: keyof TodoUpdate,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="container mx-auto max-w-2xl py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Todos
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleToggle}
                disabled={isToggling}
              >
                {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleSave}
                disabled={isUpdating || !formData.name?.trim()}
              >
                <Save className="h-4 w-4 mr-2" />
                {isUpdating ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Todo Details */}
      <Card className={`priority-${todo.priority}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  'w-4 h-4 rounded-full mt-1 flex-shrink-0',
                  `priority-dot-${todo.priority}`,
                )}
              />
              <div>
                <CardTitle
                  className={cn(
                    'text-2xl',
                    todo.completed && 'line-through text-muted-foreground',
                  )}
                >
                  {isEditing ? (
                    <Input
                      value={formData.name || ''}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      className="text-2xl font-semibold"
                      placeholder="Todo name"
                    />
                  ) : (
                    todo.name
                  )}
                </CardTitle>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={todo.completed ? 'default' : 'secondary'}>
                {todo.completed ? 'Completed' : 'Active'}
              </Badge>
              <Badge
                variant="outline"
                className={cn(
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
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <Label className="text-base font-medium">Description</Label>
            {isEditing ? (
              <Textarea
                value={formData.description || ''}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                placeholder="Todo description"
                rows={4}
                className="mt-2"
              />
            ) : (
              <p
                className={cn(
                  'mt-2 text-muted-foreground',
                  todo.completed && 'line-through',
                  !todo.description && 'italic',
                )}
              >
                {todo.description || 'No description provided'}
              </p>
            )}
          </div>

          {/* Priority */}
          {isEditing && (
            <div>
              <Label className="text-base font-medium">Priority</Label>
              <Select
                value={String(formData.priority || todo.priority)}
                onValueChange={(value) =>
                  handleInputChange('priority', Number(value) as 1 | 2 | 3)
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Low (1)</SelectItem>
                  <SelectItem value="2">Medium (2)</SelectItem>
                  <SelectItem value="3">High (3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Username */}
          <div>
            <Label className="text-base font-medium">Username</Label>
            {isEditing ? (
              <Input
                value={formData.username || ''}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Username"
                className="mt-2"
              />
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{todo.username}</span>
              </div>
            )}
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Created
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formatDate(todo.createdAt)}</span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Last Updated
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formatDate(todo.updatedAt)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TodoDetailPage
