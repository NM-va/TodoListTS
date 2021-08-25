import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListActionType
    | ChangeTodoListFilterActionType

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST"
  todoListID: string
}

export type AddTodoListActionType = {
  type: "ADD-TODOLIST"
  title: string
  todoListID: string
}

export type ChangeTodoListActionType = {
  type: "CHANGE-TODOLIST-TITLE"
  title: string
  todoListID: string
}

export type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER"
  filter: FilterValuesType
  todoListID: string
}

let initialState: Array<TodoListType> = [];

export const todoListsReducer = (state: Array<TodoListType>, action: ActionType):Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST" :
      return state.filter(tl => tl.id !== action.todoListID);
      
    case "ADD-TODOLIST" :
      const newTodoList: TodoListType = {
        id: action.todoListID,
        title: action.title,
        filter: "all"
      }
      return [...state, newTodoList];
      
    case "CHANGE-TODOLIST-TITLE" :
      return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
      
    case "CHANGE-TODOLIST-FILTER" :
      return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
      
    default:
      return state
  }
}

export const removeTodoListAC = (todoListID: string):RemoveTodoListActionType => {
  return {type: "REMOVE-TODOLIST", todoListID: todoListID}
}

export const addTodoListAC = (title:string):AddTodoListActionType => {
  return {type: "ADD-TODOLIST", title: title, todoListID: v1()}
}

export const changeTodoListTitleAC = (title:string, todoListID:string):ChangeTodoListActionType => {
  return {type: "CHANGE-TODOLIST-TITLE", title: title, todoListID: todoListID
  }
}

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListID:string):ChangeTodoListFilterActionType => {
  return {type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListID: todoListID}
}

