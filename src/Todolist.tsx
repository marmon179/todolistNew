import React, {useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string,
    title: string,
    isDone: boolean

}
type PropsType = {
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
    title: string,
    tasks: Array<TaskType>
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('');
    const addTask = () => {
        props.addTask(title);
        setTitle('');
    };
    const onKeyPress = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };

    const onAllClickHandler = () => {
        props.changeFilter('all');
    };
    const onActiveClickHandler = () => {
        props.changeFilter('active');
    };
    const onCompletedClickHandler = () => {
        props.changeFilter('completed');
    };
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={(e) => setTitle((e.currentTarget.value))}/>
                <button onClick={addTask} onKeyPress={onKeyPress}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id);
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>;
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}
