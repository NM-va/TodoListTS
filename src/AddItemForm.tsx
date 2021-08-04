import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {Add, AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
  addItem: (title:string) => void
}

export const AddItemForm = (props:AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<boolean>(false)
  
  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {if (e.key === "Enter") addItem()}
  
  const addItem = () => {
    const trimmedTitle = title.trim()
    if(trimmedTitle){
      props.addItem(trimmedTitle)
    } else {
      setError(true)
    }
    setTitle("")
  }
  
  const errorMessage = 'Title is required!';

  
  return (
    <div>
      <TextField
        value={title}
        onChange={onTitleChangeHandler}
        onKeyPress={onKeyHandler}
        variant={'outlined'}
        size={"small"}
        label={"Title"}
        error={error}
        helperText={error && errorMessage}
        // helperText={"Enter task title"}
      />

      <IconButton
        size={"small"}
        color={'primary'}
        onClick={addItem}
      >
        <AddBox />
      </IconButton>
    </div>
  )
}