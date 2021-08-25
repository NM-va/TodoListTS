import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../TodoList";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export type RemoveTaskActionType = {
  type: "REMOVE-TASK"
  todoListID: string//rename ID caps all project to equal
  taskId: string
}

export type AddTaskActionType = {
  type: "ADD-TASK"
  todoListID: string
  title: string
}

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS"
  taskId: string
  todoListID: string
  isDone: boolean
}

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE"
  taskId: string
  todoListID: string
  title: string
}

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK" :
      let copyState = {...state};
      copyState[action.todoListID] = copyState[action.todoListID].filter(task => task.id ! = action.taskId); //переприсваивание обязательно

      return copyState;
      
    case "ADD-TASK" :
      const newTask: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false
      }

      return {
        ...state,
        [action.todoListID]: [
          newTask,
          ...state[action.todoListID]
        ]
      };
    case "CHANGE-TASK-STATUS" :
      return {
        ...state,
        [action.todoListID]: [
          ...state[action.todoListID].map(task => task.id === action.taskId ? {
            ...task, isDone: action.isDone} : task)
        ]
      };

    case "CHANGE-TASK-TITLE" :
      return {
        ...state,
        [action.todoListID]: [
          ...state[action.todoListID].map(task => task.id === action.taskId ? {...task, title: action.title} : task)
        ]
      };

    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todoListID]: []
      };

    case "REMOVE-TODOLIST" : {
      let copyState = {...state};
      delete copyState[action.todoListID];
      // const {[action.id]: [], ...rest} = store
      // return rest
      return copyState;
    }

    default:
      throw new Error("I don't ")
  }
}

export const removeTaskAC = (taskId: string, todoListId: string):RemoveTaskActionType => {
  return {type: "REMOVE-TASK", taskId, todoListID: todoListId}
}

export const addTaskAC = (title: string, todoListId: string):AddTaskActionType => {
  return {type: "ADD-TASK", title: title, todoListID: todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string):ChangeTaskStatusActionType => {
  return {type: "CHANGE-TASK-STATUS", taskId, isDone, todoListID: todoListId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string):ChangeTaskTitleActionType => {
  return {type: "CHANGE-TASK-TITLE", taskId, title, todoListID: todoListId}
}

