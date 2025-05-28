import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: async (todoName: string) => {
      return await todoApi.createTodo(todoName)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
