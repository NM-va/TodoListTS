import React, {useEffect, useState} from "react"
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}




export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data);
            })
        
    }, [])
    
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title= "New title"
        todolistApi.createTodo(title)
            .then( (res) => {
            setState(res.data);
        } )
    
    }, [])
    
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '9d84e150-9e3a-4bb8-9276-8109207f1d7f';
        todolistApi.deleteTodo(todolistId)
            .then( (res) => {
            setState(res.data);
        })
    
    }, [])
    
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '861e474f-5b49-4e05-bae6-7fd93c402772';
        const title = 'REACT>>>>>>>>>';
        
        todolistApi.updateTodo(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    
    }, [])
    
    return <div> {JSON.stringify(state)}</div>
}

