import { BrowserRouter } from 'react-router'
import { TodosProvider } from './providers/todos.provider'
import { Layout } from './components/layout'

function App() {
  return (
    <Layout>
      <TodosProvider>
        <BrowserRouter></BrowserRouter>
      </TodosProvider>
    </Layout>
  )
}

export default App
