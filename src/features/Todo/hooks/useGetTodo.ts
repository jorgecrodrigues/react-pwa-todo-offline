import { useQuery } from "@tanstack/react-query"

export default function useTodoList() {
  return useQuery(['todoList'], () => fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json()))
}
