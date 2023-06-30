import useGetTodo from "../hooks/useGetTodo"

import Create from "./Create"
import { Todo } from "../types"

export default function List() {
    const { data, isLoading, isError } = useGetTodo()

    return (
        <div>
            <h1>Todo List</h1>
            <Create />
            {isLoading && <div>Loading...</div>}
            {isError && <div style={{color: 'red'}}>Something went wrong</div>}
            <ul>
                {data?.map((todo: Todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    )
}
