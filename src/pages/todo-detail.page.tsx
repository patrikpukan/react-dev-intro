import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/spinner'
import { ErrorMessage } from '@/components/error-message'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Flag,
  Trash2,
  User,
  Check,
  X,
} from 'lucide-react'
import { useTodoQuery } from '../hooks/useTodoQuery'
import { useTodoDelete } from '../hooks/useTodoDelete'
import { useTodoToggle } from '../hooks/useTodoToggle'
import { useTodoUpdate } from '../hooks/useTodoUpdate'

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

const TodoDetailPage = () => {
  const navigate = useNavigate()
  const { data: todo, isError, isLoading } = useTodoQuery()
  const { mutate: deleteTodo, isPending: isDeleting } = useTodoDelete()
  const { mutate: toggleTodo, isPending: isToggling } = useTodoToggle()
  const { mutate: updateTodo, isPending: isUpdating } = useTodoUpdate()

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: todo?.name || '',
    description: todo?.description || '',
    priority: todo?.priority || 2,
  })

  // Update form when todo data loads
  useState(() => {
    if (todo) {
      setEditForm({
        name: todo.name,
        description: todo.description || '',
        priority: todo.priority,
      })
    }
  })

  const handleDeleteTodo = () => {
    if (todo) {
      deleteTodo(todo.id, {
        onSuccess: () => navigate('/'),
      })
    }
  }

  const handleToggleTodo = () => {
    if (todo) {
      toggleTodo({ id: todo.id, completed: !todo.completed })
    }
  }

  const handleUpdateTodo = () => {
    if (todo) {
      updateTodo(
        {
          id: todo.id,
          name: editForm.name,
          description: editForm.description,
          priority: editForm.priority,
        },
        {
          onSuccess: () => {
            setIsEditDialogOpen(false)
          },
        },
      )
    }
  }

  const handleEditFormChange = (field: string, value: string | number) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    )
  }

  if (isError || !todo) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Todos
              </Button>
            </Link>
          </div>
          <ErrorMessage message="Failed to load todo details. Please try again." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Todos
            </Button>
          </Link>
        </div>

        {/* Main Todo Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CardTitle
                    className={`text-2xl ${
                      todo.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {todo.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={getPriorityColor(todo.priority)}
                  >
                    <Flag className="h-3 w-3 mr-1" />
                    {getPriorityText(todo.priority)} Priority
                  </Badge>
                  {todo.completed ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Check className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <X className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Description */}
            {todo.description && (
              <div>
                <Label className="text-base font-medium">Description</Label>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    todo.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {todo.description}
                </p>
              </div>
            )}

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              {todo.userId && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Created by</div>
                    <div className="text-sm text-muted-foreground">
                      {todo.userId}
                    </div>
                  </div>
                </div>
              )}
              {todo.updatedAt && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Last updated</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(todo.updatedAt)}
                    </div>
                  </div>
                </div>
              )}
              {todo.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Created</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(todo.createdAt)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <Button
                onClick={handleToggleTodo}
                disabled={isToggling}
                variant={todo.completed ? 'outline' : 'default'}
                className="gap-2"
              >
                {todo.completed ? (
                  <>
                    <X className="h-4 w-4" />
                    Mark as Pending
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Mark as Complete
                  </>
                )}
              </Button>

              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Todo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
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
                        rows={4}
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
                      variant="outline"
                      onClick={() => setIsEditDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateTodo} disabled={isUpdating}>
                      {isUpdating ? 'Updating...' : 'Update Todo'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                variant="destructive"
                onClick={handleDeleteTodo}
                disabled={isDeleting}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? 'Deleting...' : 'Delete Todo'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TodoDetailPage
