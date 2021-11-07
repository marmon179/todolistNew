import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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
    };

    const removeTodolist = () => props.removeTodoList(props.id);
    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                    <IconButton onClick={removeTodolist}><Delete/></IconButton>
                </h3>

            </div>
            <AddItemForm addItem={addTask}/>
            <div>
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
                        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox color="primary" checked={t.isDone} onChange={onChangeHandler}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onClickHandler}><Delete/></IconButton>
                        </div>;
                    })
                }
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    color="default"
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    color="primary"
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    color="secondary"
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
}

