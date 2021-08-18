import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionType =  RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListActionType | ChangeTodoListFilterActionType

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST"
  todoListID: string
}

export type AddTodoListActionType = {
  type: "ADD-TODOLIST"
  title: string
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


export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
  switch (action.type) {
    case "REMOVE-TODOLIST" :
      return todoLists.filter(tl => tl.id !== action.todoListID);
      
    case "ADD-TODOLIST" :
      const todoListID = v1();
      const newTodoList: TodoListType = {
        id: todoListID,
        title: action.title,
        filter: "all"
      }
      return [...todoLists, newTodoList];
      
    case "CHANGE-TODOLIST-TITLE" :
      return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl);
      
    case "CHANGE-TODOLIST-FILTER" :
      return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl);
      
    default:
      return todoLists
  }
}

export const RemoveTodoListActionCreator = (todoListID: string):RemoveTodoListActionType => {
  return {type: "REMOVE-TODOLIST", todoListID: todoListID}
}

export const AddTodoListActionCreator = (title:string):AddTodoListActionType => {
  return {type: "ADD-TODOLIST", title: title}
}

export const ChangeTodoListActionCreator = (title:string, todoListID:string):ChangeTodoListActionType => {
  return {type: "CHANGE-TODOLIST-TITLE", title: title, todoListID: todoListID
  }
}

export const ChangeTodoListFilterActionCreator = (filter: FilterValuesType, todoListID:string):ChangeTodoListFilterActionType => {
  return {type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListID: todoListID}
}

