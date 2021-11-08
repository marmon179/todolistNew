import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: TaskType []
}

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();
    let [todoLists, setTodoLists] = useState<TodoListType[]>([
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
    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
        ],
        [todoListId2]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
        ]
    });
    const removeTask = (id: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].filter(t => t.id != id);
        setTasks({...tasks});
    };

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    };
    const addTask = (title: string, todoListId: string) => {
        let task = {id: v1(), title: title, isDone: false};
        let todoListTask = tasks[todoListId];
        tasks[todoListId] = [task, ...todoListTask];
        setTasks({...tasks});
    };
    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    };
    const removeTodoList = (id: string) => {
        setTodoLists(todoLists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks});
    };
    const addTodolist = (title: string) => {
        let newTodolistID = v1();
        let newTodolist: TodoListType = {id: newTodolistID, title: title, filter: 'all'};
        setTodoLists([newTodolist, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodolistID]: []
        });
    };
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    };
    const changeTodolistTitle = (id: string, title: string) => {
        const todolist = todoLists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = title;
            setTodoLists([...todoLists]);
        }
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
                <Grid container style={{padding:'20px'}}>
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
                                <Paper style={{padding:'10px'}}>
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

export default App;
