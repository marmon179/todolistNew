import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTask] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]);
    const removeTask = (id: string) => {
        tasks = tasks.filter(t => t.id != id);
        setTask(tasks);
    };
    let [filter, setFilter] = useState<FilterValuesType>('all');
    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone);
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    };
    const addTask = (title:string) => {
        setTask([{id: v1(), title: title, isDone: false}, ...tasks]);
    };
    return (
        <div className="App">
            <Todolist
                tasks={tasks}
                title="What to learn"
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask = {addTask}
            />
        </div>
    );
}

export default App;
