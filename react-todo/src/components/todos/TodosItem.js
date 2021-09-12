import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { FaBeer, FaTrashAlt, FaCheck } from 'react-icons/fa'
import { getAuth } from "firebase/auth"
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";

const toggleImportant = async (todoId, important) => {
  console.log('toggle: ', todoId);
  const db = getFirestore();
  const auth = getAuth();
  const newImportant = !important;

  try {
    const todoRef = doc(db, 'users3', auth.currentUser.uid, 'todos', todoId);
    await setDoc(todoRef, { important: newImportant }, { merge: true});
  } catch (err) {
    console.log(err);
  }
}

const toggleCompleted = async (todoId, completed) => {
  const db = getFirestore();
  const auth = getAuth();
  const newCompleted = !completed;

  try {
    const todoRef = doc(db, 'users3', auth.currentUser.uid, 'todos', todoId);
    await setDoc(todoRef, { completed: newCompleted }, { merge: true});
  } catch (err) {
    console.log(err);
  }
}

const deleteTodo = async (todoId) => {
  console.log("delete", todoId);
  const db = getFirestore();
  const auth = getAuth();
  try {
    const todoRef = doc(db, 'users3', auth.currentUser.uid, 'todos', todoId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
}

const TodoItemComponent = props => {
  const todo = props.todo

  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center" 
      variant={todo.important ? 'primary' : 'light'}
    >
      
      <div style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
        <Button
          className="me-2"
          variant={todo.completed ? 'success' : 'outline-success'}
          onClick={() => toggleCompleted(todo.id, todo.completed)}
        >
          <FaCheck />
        </Button>
       {todo.todo}
      </div>
      
      <div>
        <Button
          className="me-2"
          variant={todo.important ? 'warning' : 'outline-warning'}
          onClick={() => toggleImportant(todo.id, todo.important)}
        >
          <FaBeer />
        </Button>

        <Button
          variant="danger"
          onClick={() => deleteTodo(todo.id)}
        >
          <FaTrashAlt />
          </Button>
      </div>
    </ListGroup.Item>
  )
}

export default TodoItemComponent;