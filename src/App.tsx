import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/layout'
import { lazy, Suspense } from 'react'
import { Spinner } from './components/spinner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-provider'

const TodoDetailPage = lazy(() => import('./pages/todo-detail.page.tsx'))
const TodoListPage = lazy(() => import('./pages/todo-list.page.tsx'))
const AddTodoPage = lazy(() => import('./pages/add-todo.page.tsx'))

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="todo-app-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<div>is loading</div>}>
                    <TodoListPage />
                  </Suspense>
                }
              />
              <Route
                path="/add-todo"
                element={
                  <Suspense fallback={<Spinner />}>
                    <AddTodoPage />
                  </Suspense>
                }
              />
              <Route
                path="/todos/:id"
                element={
                  <Suspense fallback={<Spinner />}>
                    <TodoDetailPage />
                  </Suspense>
                }
              />
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
