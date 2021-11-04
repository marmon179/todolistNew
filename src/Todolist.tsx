import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean

}
type PropsType = {
    removeTask: (id: string, todoListId: string) => void
    removeTodoList: (id: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    title: string,
    tasks: Array<TaskType>
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    id: string
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id);
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
        props.changeFilter('all', props.id);
    };
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id);
    };
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id);
    };
    const removeTodolist = () => props.removeTodoList(props.id);
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <button onClick={removeTodolist}>X</button>
            </div>
            <div>
                <input value={title} onChange={(e) => setTitle((e.currentTarget.value))}/>
                <button onClick={addTask} onKeyPress={onKeyPress}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.id);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
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
