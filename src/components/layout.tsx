import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { ThemeSwitcher } from './theme-switcher'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            Todo App
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/add-todo">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Todo
              </Button>
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
