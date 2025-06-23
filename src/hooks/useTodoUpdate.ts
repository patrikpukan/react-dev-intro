import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo, TodoUpdate } from '../types'

export const useTodoUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<
    Todo,
    ApiError,
    TodoUpdate,
    { previousTodos: Todo[] | undefined }
  >({
    mutationKey: ['updateTodo'],
    mutationFn: async (updateData: TodoUpdate) => {
      return await todoApi.updateTodo(updateData)
    },
    onMutate: async (updateData) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return (
          old?.map((todo) =>
            todo.id === updateData.id
              ? { ...todo, ...updateData, updatedAt: new Date().toISOString() }
              : todo,
          ) || []
        )
      })

      return { previousTodos }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  })
}
