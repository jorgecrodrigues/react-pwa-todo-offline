import { useMutation } from "@tanstack/react-query"

export default function usePostTodo() {
  return useMutation((todo: any) => fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    }).then(res => res.json()))
}
