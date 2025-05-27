import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { todoApi } from '../api/todoApi'

export const useTodoQuery = () => {
  const params = useParams()
  return useQuery({
    queryKey: ['todo', params.id],
    queryFn: () => {
      return todoApi.fetchTodo(Number(params.id))
    },
  })
}
