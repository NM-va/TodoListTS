import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import {authReducer} from '../features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {appReducer} from './app-reducer';
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
});

export type RootReducerType = typeof rootReducer;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware)
});

export type AppRootStateType = ReturnType<RootReducerType>

type AppDispatchType = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatchType>();

// @ts-ignore
window.store = store;
