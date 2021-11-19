import React,{useState} from 'react';
import {List, ListItemText,ListItem,Modal} from '@material-ui/core';
import db from './firebase';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border:'2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function Todo(props) {
    const [open,setOpen]=useState(false);
    const [input,setInput]=useState();
    const classes = useStyles();
    const updateTodo = () => {
        db.collection('todos').doc(props.text.id).set({
            todo:input
        },{merge: true});
        setInput('');
        setOpen(false);
    }
    
    return (
        <>
        <Modal 
        className={classes.modal}
        open={open}
        onClose={e=> setOpen(false)}
        >
        <div className={classes.paper}>
        <h1 >I'm Modal</h1>
        <input placeholder={props.text.todo} value={input} onChange={event => setInput(event.target.value)}/>
        <button onClick={updateTodo}>Update Todo</button>
        </div>
        </Modal>
        <List>
            <ListItem>
            <ListItemText primary={props.text.todo} secondary="dummy deadline ⏱️"/>
            <Button onClick={e=> setOpen(true)}>Edit</Button>
            <Button onClick={
                event => db.collection('todos').doc(props.text.id).delete()
            }>
            <img src="https://www.vhv.rs/dpng/d/152-1520604_delete-trash-dustbin-garbage-remove-recyclebin-ui-icon.png"
                alt='Delete'
                width="50" height="50"
            /></Button>
            </ListItem>
            </List>
        </>
    )
}

export default Todo
