import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
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
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    };
    const onKeyPress = (e: KeyboardEvent<HTMLButtonElement>) => {
        setError(null);
        if (e.keyCode === 13) {
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
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue);
                        };
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>;
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}
