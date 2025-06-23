import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo } from '../types'

export const useBulkDeleteTodos = () => {
  const queryClient = useQueryClient()

  return useMutation<
    unknown[],
    ApiError,
    number[],
    { previousTodos: Todo[] | undefined }
  >({
    mutationKey: ['bulkDeleteTodos'],
    mutationFn: async (ids: number[]) => {
      return await todoApi.bulkDeleteTodos(ids)
    },
    onMutate: async (ids) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return old?.filter((todo) => !ids.includes(todo.id)) || []
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
    },
  })
}

export const useBulkToggleTodos = () => {
  const queryClient = useQueryClient()

  return useMutation<
    Todo[],
    ApiError,
    { ids: number[]; completed: boolean },
    { previousTodos: Todo[] | undefined }
  >({
    mutationKey: ['bulkToggleTodos'],
    mutationFn: async ({ ids, completed }) => {
      return await todoApi.bulkToggleTodos(ids, completed)
    },
    onMutate: async ({ ids, completed }) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return (
          old?.map((todo) =>
            ids.includes(todo.id)
              ? { ...todo, completed, updatedAt: new Date().toISOString() }
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
    },
  })
}
