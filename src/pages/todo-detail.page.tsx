import { useParams } from 'react-router'

const TodoDetailPage = () => {
  const params = useParams()

  return <div>{params.id}</div>
}

export default TodoDetailPage
