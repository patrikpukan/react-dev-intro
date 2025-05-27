import { BrowserRouter, Route, Routes } from 'react-router'
import { TodosProvider } from './providers/todos.provider'
import { Layout } from './components/layout'
import TodoListPage from './pages/todo-list.page'
import TodoDetailPage from './pages/todo-detail.page'

function App() {
  return (
    <Layout>
      <TodosProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodoListPage />} />
            <Route path="/todos/:id" element={<TodoDetailPage />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </BrowserRouter>
      </TodosProvider>
    </Layout>
  )
}

export default App
