import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';

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
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    title: string,
    tasks: Array<TaskType>
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    id: string
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id);
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
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const removeTodolist = () => props.removeTodoList(props.id);
    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                    <button onClick={removeTodolist}>X</button>
                </h3>

            </div>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.id);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                        };
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id);
                        };
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
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

