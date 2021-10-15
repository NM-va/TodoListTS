import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '968a1a28-eb55-43a7-89bc-ff44bc6685f0'
    }
})

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export const todolistApi = {
    getTodos() {
       return instance.get<Array<TodoType>>('todo-lists');
    },
    
    createTodo(title:string) {
        return instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title});
    },
    
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`);
    },
    
    updateTodo(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title});
    }
    
}