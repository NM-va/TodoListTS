import React, {useReducer, useState} from "react"
import "./App.css"
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
  addTodoListAC,
  changeTodoListTitleAC,
  changeTodoListFilterAC,
  removeTodoListAC,
  todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const AppWithReducer = () => {
  // BLL:
  
  const todoListID_1 = v1();
  const todoListID_2 = v1();
  
  const [todoLists, dispatchToTodoLists] = useReducer( todoListsReducer, [
    {id: todoListID_1, title: "What to learn", filter: "all"},
    {id: todoListID_2, title: "What to bye", filter: "all"}
  ]);
  
  const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    [todoListID_1]: [
      {id: v1(), title: "HTML", isDone: false},
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JS", isDone: false},
    ],
    [todoListID_2]: [
      {id: v1(), title: "Beer", isDone: false},
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Water", isDone: true},
    ]
  });
  
  
  const removeTask = (taskID: string, todoListID: string) => {
    dispatchToTasks(removeTaskAC(taskID, todoListID));
  }
  
  const addTask = (title: string, todoListID: string) => {
    dispatchToTasks(addTaskAC(title, todoListID));
  }
  
  const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
    dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID));
  }
  
  const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
    dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID));
  }
  
  const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
    dispatchToTodoLists(changeTodoListFilterAC(filter, todoListID));
  }
  const changeTodoListTitle = (title: string, todoListID: string) => {
    dispatchToTodoLists(changeTodoListTitleAC(title, todoListID));
  }
  const removeTodoList = (todoListID: string) => {
    let action = removeTodoListAC(todoListID)
    dispatchToTodoLists(action);
    dispatchToTasks(action);
  }
  
  const addTodoList = (title: string) => {
    let action = (addTodoListAC(title));
    dispatchToTodoLists(action);
    dispatchToTasks(action);
  }
  
  
  // UI:
  const getTasksForRender = (todoList: TodoListType): TaskType[] => {
    switch (todoList.filter) {
      case "completed":
        return tasks[todoList.id].filter(t => t.isDone)
      case "active":
        return tasks[todoList.id].filter(t => !t.isDone)
      default:
        return tasks[todoList.id]
    }
  }
  
  const todoListComponents = todoLists.map(tl => {
    return (
      <Grid item key={tl.id}>
        <Paper style={{padding: "10px"}} elevation={5}>
          <TodoList
            id={tl.id}
            filter={tl.filter}
            title={tl.title}
            tasks={getTasksForRender(tl)}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeTodoListFilter}
            removeTodoList={removeTodoList}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        </Paper>
      </Grid>
    )
  })
  
  return (
    <div className="">
      <AppBar position="static">
        <Toolbar style={{justifyContent: "space-between"}}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            TodoLists
          </Typography>
          <Button
            variant={"outlined"}
            color="inherit"
          >Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid
          container
          style={{padding: "10px 0"}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={5}>
          {todoListComponents}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;
