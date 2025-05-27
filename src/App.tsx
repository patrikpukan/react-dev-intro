import { Header } from './components/header'
import { TodosSection } from './components/todos/todos-section'

function App() {
  return (
    <>
      <div className="container">
        <Header title="My Todo List" subtitle="Add your tasks" />
        <TodosSection />
        <footer>
          <p>Click on a task to mark it as completed</p>
        </footer>
      </div>
    </>
  )
}

export default App
