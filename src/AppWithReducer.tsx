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

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType []
}

function AppWithReducer() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodolist] = useReducer(todolistReducer, [
        {
            id: todoListId1,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: todoListId2,
            title: 'What to buy',
            filter: 'all'
        }
    ]);

    let [tasks, dispatchToTask] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todoListId2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    });
    const removeTask = (id: string, todoListId: string) => {
        dispatchToTask(removeTaskAC(id, todoListId));
    };
    const addTask = (title: string, todoListId: string) => {
        dispatchToTask(addTaskAC(title, todoListId));
    };
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatchToTask(changeTaskTitleAC(id, newTitle, todolistId));
    };
    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        dispatchToTask(changeTaskStatusAC(id, isDone, todoListId));
    };

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        dispatchToTodolist(ChangeTodolistFilterAC(value, todoListId));
    };
    const removeTodoList = (id: string) => {
        dispatchToTodolist(RemoveTodolistAC(id));
    };
    const addTodolist = (title: string) => {
        dispatchToTodolist(AddTodolistAC(title));
    };
    const changeTodolistTitle = (id: string, title: string) => {
        dispatchToTodolist(ChangeTodolistTitleAC(id, title));
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

export default AppWithReducer;
