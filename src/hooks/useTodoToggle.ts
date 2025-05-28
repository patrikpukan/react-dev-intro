import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo, TodoToggle } from '../types'

export const useTodoToggle = () => {
  const queryClient = useQueryClient()

  return useMutation<Todo, ApiError, TodoToggle>({
    mutationKey: ['toggleTodo'],
    mutationFn: async (todoToggle: TodoToggle) => {
      return await todoApi.toggleTodo(todoToggle)
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      await queryClient.cancelQueries({
        queryKey: ['todo', String(variables.id)],
      })

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      const previousTodo = queryClient.getQueryData<Todo>([
        'todo',
        String(variables.id),
      ])

      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => {
        return (oldTodos || []).map((todo) =>
          todo.id === variables.id
            ? { ...todo, completed: variables.completed }
            : todo,
        )
      })

      if (previousTodo) {
        queryClient.setQueryData<Todo>(['todo', String(variables.id)], {
          ...previousTodo,
          completed: variables.completed,
        })
      }

      return { previousTodos, previousTodo }
    },
    onSettled: (_data, _error, variables) => {
      // Always refetch after error or success to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.invalidateQueries({
        queryKey: ['todo', String(variables.id)],
      })
    },
  })
}
