import React, {useCallback, useEffect} from "react"
import "./App.css"
import {TodolistsList} from "../features/TodolistsList/TodolistsList"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "./store"
import {RequestStatusType, initializeAppTC} from "./app-reducer"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {Menu} from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar"
import {Route, Routes} from "react-router-dom"
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer"


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    
    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, []);
    
    if(!isInitialized) return <Box sx={{ display: 'flex' }}><CircularProgress /></Box>

    
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                </Toolbar>
                {status === 'loading'
                && <LinearProgress onClick={() => dispatch(logoutTC())}/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/login"} element={<Login />}/>
                    <Route path={"/"} element={<TodolistsList demo={demo}/>} />
                    <Route path={"/*"} element={<div>404</div>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
