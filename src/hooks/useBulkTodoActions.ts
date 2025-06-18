import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi'

export const useBulkTodoDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: number[]) => todoApi.deleteTodos(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

export const useBulkTodoToggle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ ids, completed }: { ids: number[]; completed: boolean }) =>
      todoApi.toggleTodos(ids, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
