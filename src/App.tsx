import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/layout'
import { lazy, Suspense } from 'react'
import { Spinner } from './components/spinner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './providers/theme.provider'

const TodoDetailPage = lazy(() => import('./pages/todo-detail.page.tsx'))
const TodoListPage = lazy(() => import('./pages/todo-list.page.tsx'))
const TodoCreatePage = lazy(() => import('./pages/todo-create.page.tsx'))

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="todo-app-theme">
      <QueryClientProvider client={queryClient}>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<Spinner />}>
                    <TodoListPage />
                  </Suspense>
                }
              />
              <Route
                path="/create"
                element={
                  <Suspense fallback={<Spinner />}>
                    <TodoCreatePage />
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
              <Route
                path="/todos/:id/edit"
                element={
                  <Suspense fallback={<Spinner />}>
                    <TodoDetailPage />
                  </Suspense>
                }
              />
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
