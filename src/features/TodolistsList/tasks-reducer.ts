import {
    AddTodolistActionType, addTodolistTC, FilterValuesType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
    TodolistDomainType,
    addTodolistAC,
    removeTodolistAC,
    setTodolistsAC
} from './todolists-reducer'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    TodolistType,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType, SetAppErrorActionType} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAction, createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

const initialState: TasksStateType = {};
const addTodolist = createAction('addTodolist');

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state: TasksStateType, action: PayloadAction<{taskId: string, todolistId: string}>){
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((task) => task.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        },
        addTaskAC(state: TasksStateType, action: PayloadAction<TaskType>){
            state[action.payload.todoListId].unshift(action.payload);
        },
        updateTaskAC(state: TasksStateType, action: PayloadAction<{taskId: string, model: UpdateDomainTaskModelType, todolistId: string}>){
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((task) => task.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        },
        setTasksAC(state: TasksStateType, action: PayloadAction<{tasks: Array<TaskType>, todolistId: string}>){
            state[action.payload.todolistId] = action.payload.tasks;
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(addTodolistAC, (state: any, action: any) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (state: any, action: any) => {
            delete state[action.payload.id];
        });
        builder.addCase(setTodolistsAC, (state: any, action: any) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
    }
});

export const tasksReducer = slice.reducer;
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions;

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items;
            dispatch(setTasksAC({tasks, todolistId}));
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
};
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC({taskId, todolistId});
            dispatch(action)
        })
};
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item;
                const action = addTaskAC(task);
                dispatch(action);
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
};
export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find((t: any) => t.id === taskId);
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state');
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...model
        };

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({taskId, model, todolistId});
                    dispatch(action);
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    };

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ThunkDispatch = Dispatch<SetAppStatusActionType | SetAppErrorActionType>
