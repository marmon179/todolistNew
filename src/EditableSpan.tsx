import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}
const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    const activeViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    return editMode
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={activeViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>;
};

export default EditableSpan;
