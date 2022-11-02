import './App.css';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addItem } from './redux/modules/todos';
import React, { useId } from 'react'
import Router from "./shared/Router";
import { Link } from "react-router-dom";

const ContainerToDoItem = styled.div`
width: 270px;
border: 4px solid teal;
min-height: 150px;
border-radius: 12px;
padding: 12px 24px 24px;
`;

const DeleteButton = styled.button`
width: 60px;
height: 25px;
margin: 5px;
color: white;
border: none;
border-radius: 5px;
background-color: red;
`;

const DoneButton = styled.button`
width: 60px;
height: 25px;
margin: 5px;
color: white;
border-radius: 5px;
border: none;
background-color: blue;
`;

const ToDoItem = ({ task }) => {
  return (
    <ContainerToDoItem key={task.id}>
      <h3>{task.title}</h3>
      <p>{task.body}</p>
      <DeleteButton>Delete</DeleteButton>
      <DoneButton>Done</DoneButton>
    </ContainerToDoItem>
  );
};

const ToDoItemDone = ({ task }) => {
  return (
    <ContainerToDoItem key={task.id}>
      <h3>{task.title}</h3>
      <p>{task.body}</p>
      <DeleteButton>Delete</DeleteButton>
      <DoneButton>Cancel</DoneButton>
    </ContainerToDoItem>
  );
};

const ContainerToDoList = styled.div`
display: flex;
flex-direction: row;
gap: 16px;
`;

const ToDoList = () => {
  const toDos = useSelector(state => state.toDos.items);
  return (
    <ContainerToDoList>
      {toDos.filter(task => task.isDone === false).map(task => {
        return <ToDoItem task={task} />
      })}
    </ContainerToDoList>
  );
};

const ToDoListDone = () => {
  const toDos = useSelector(state => state.toDos.items);
  return (
    <ContainerToDoList>
      {toDos.filter(task => task.isDone === true).map(task => {
        return <ToDoItemDone task={task} />
      })}
    </ContainerToDoList>
  );
};

const ContainerToDoForm = styled.div`
background-color: rgb(238, 238, 238);
border-radius: 12px;
margin: 0px auto;
display: flex;
align-items: center;
padding: 30px;
gap: 20px;
`;

const InputForm = styled.input`
background-color: white;
border-radius: 10px;
border: none;
height: 25px;
padding: 5px;
`;

const AddButton = styled.button`
width: 60px;
height: 30px;
color: white;
border-radius: 5px;
border: none;
background-color: green;
`;

const ToDoForm = () => {
  const dispatch = useDispatch();
  const [toDo, setToDo] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isDone, setIsDone] = useState(false);
  const handleNewTitle = ({ target: { value } }) => {
    setTitle(value)
  };
  const handleNewBody = ({ target: { value } }) => {
    setBody(value)
  };
  const createNewToDo = () => {
    if (!title) return alert("Please fill title field");
    if (!body) return alert("Please fill body field");
    setToDo([...toDo, { id: useId, title: title, body: body, isDone: isDone }]);
    dispatch(addItem(toDo));
    setTitle('');
    setBody('');
  }
  return (
    <ContainerToDoForm>
      Title: <InputForm
        value={title}
        onChange={handleNewTitle}
      />
      Body: <InputForm
        value={body}
        onChange={handleNewBody}
      />
      <AddButton onClick={createNewToDo}>Add</AddButton>
    </ContainerToDoForm>
  );
};

const ContainerApp = styled.div`
margin: 10px;
`;

const App = () => {
  return (
    <ContainerApp>
      <h1>To Do List</h1>
      <ToDoForm />
      <h1>Working</h1>
      <ToDoList />
      <h1>Done</h1>
      <ToDoListDone />
    </ContainerApp>
  );
};

export default App;
