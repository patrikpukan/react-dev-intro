import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const TodoForm = () => {
  return (
    <div className="flex justify-center p-4">
      <Link to="/add-todo">
        <Button className="gap-2" size="lg">
          <Plus className="h-5 w-5" />
          Add New Todo
        </Button>
      </Link>
    </div>
  )
}
