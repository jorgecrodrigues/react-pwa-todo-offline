import React from 'react'
import usePostTodo from '../hooks/usePostTodo'

export default function Create() {
    const { mutate, isLoading, isError } = usePostTodo();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
     
        mutate({ title: e.currentTarget.todo_title.value })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Todo</h1>
            {isLoading && <div>Loading...</div>}
            {isError && <div style={{color: 'red'}}>Something went wrong</div>}
            <input type="text" name='todo_title' placeholder="Todo title" required/>
            <button type="submit">Submit</button>
        </form>
    )
}
