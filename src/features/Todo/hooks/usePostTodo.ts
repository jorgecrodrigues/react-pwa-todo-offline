import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Todo } from "../types"

function mutationFn(todo: Omit<Todo, 'id'>) {
  return fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    }).then(res => res.json())
}

export default function usePostTodo() {
  const queryClient = useQueryClient()

  return useMutation(mutationFn, {
    onMutate: async (newTodo) => {
      // Random string to use as a unique id
      const id = Math.random().toString(36)
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['todoList'])
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todoList'])
      // Optimistically update to the new value
      queryClient.setQueryData<Todo[]>(['todoList'], (old: Todo[] | undefined) => {
        if (old) {
          return [{ ...newTodo, id }, ...old]
        }
        return [{ ...newTodo, id }]
      })
      // Return a context object with the snapshotted value
      return { previousTodos }
    },
    onError(_, __, context) {
      // If there was an error, roll back to the snapshot
      if (context?.previousTodos) {
        queryClient.setQueryData(['todoList'], context.previousTodos)
      }
    },
    onSettled() {
      // Always refetch after error or success:
      queryClient.invalidateQueries({ queryKey: ['todoList']})
    },
  })
}
