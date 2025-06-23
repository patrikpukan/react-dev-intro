import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { useTodoCreate } from '../hooks/useTodoCreate'
import type { TodoCreate } from '../types'
import { ArrowLeft } from 'lucide-react'

const AddTodoPage = () => {
  const navigate = useNavigate()
  const { mutate: createTodo, isPending } = useTodoCreate()

  const [formData, setFormData] = useState<TodoCreate>({
    userId: '',
    name: '',
    description: '',
    priority: 2,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.userId || !formData.name || !formData.description) {
      return
    }

    createTodo(formData, {
      onSuccess: () => {
        navigate('/')
      },
    })
  }

  const handleInputChange = (
    field: keyof TodoCreate,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Todos
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Todo</CardTitle>
            <CardDescription>
              Create a new todo item with all the necessary details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  placeholder="Enter your user ID"
                  value={formData.userId}
                  onChange={(e) => handleInputChange('userId', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="name">Todo Name</Label>
                <Input
                  id="name"
                  placeholder="What needs to be done?"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority.toString()}
                  onValueChange={(value) =>
                    handleInputChange('priority', parseInt(value))
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

              <div>
                <Label htmlFor="description">Todo Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add more details about this todo..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isPending} className="flex-1">
                  {isPending ? 'Creating...' : 'Create Todo'}
                </Button>
                <Link to="/">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AddTodoPage
