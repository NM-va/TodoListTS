import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {AxiosError} from "axios";

export const fetchTodolistsTC = createAsyncThunk("todolist/fetchTodolists", async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    const res = await todolistsAPI.getTodolists();
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}));
        return {todolists: res.data};
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        handleServerNetworkError(error, dispatch);
        return (rejectWithValue(null));
    }
});

export const removeTodolistTC = createAsyncThunk("todolist/removeTodolist", async (todolistId: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    debugger
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}));
    await todolistsAPI.deleteTodolist(todolistId);

    dispatch(setAppStatusAC({status: 'succeeded'}));
    debugger
    return {id: todolistId};
});

export const addTodolistTC = createAsyncThunk("todolist/addTodolist", async (title: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    const res = await todolistsAPI.createTodolist(title);
    dispatch(setAppStatusAC({status: 'succeeded'}));
    return {todolist: res.data.data.item};
});

export const changeTodolistTitleTC = createAsyncThunk("todolist/changeTodolistTitle", async (param: {id: string, title: string}, {dispatch, rejectWithValue}) => {
    await todolistsAPI.updateTodolist(param.id, param.title);
    return {id: param.id, title: param.title};
});

const slice = createSlice({
    name: 'app',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state: Array<TodolistDomainType>, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter;
        },
        changeTodolistEntityStatusAC(state: Array<TodolistDomainType>, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        });
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
        });
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title;
        });
    }
});

export const todolistsReducer = slice.reducer;
export const {changeTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions;


// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
