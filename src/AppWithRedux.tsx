import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType []
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const removeTask = (id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId));
    };
    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId));
    };
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    };
    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todoListId));
    };

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(value, todoListId));
    };
    const removeTodoList = (id: string) => {
        dispatch(RemoveTodolistAC(id));
    };
    const addTodolist = (title: string) => {
        dispatch(AddTodolistAC(title));
    };
    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title));
    };
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container style={{padding: '20px'}}>
                    {
                        todoLists.map(tl => {
                            let allTodoListTasks = tasks[tl.id];
                            let tasksForTodoList = allTodoListTasks;

                            if (tl.filter === 'active') {
                                tasksForTodoList = allTodoListTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = allTodoListTasks.filter(t => t.isDone);
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        tasks={tasksForTodoList}
                                        title={tl.title}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />;
                                </Paper>
                            </Grid>;
                        })
                    }
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
