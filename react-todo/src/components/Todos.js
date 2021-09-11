import React, { Component, createContext, useContext } from 'react'
import { Container, InputGroup, Button, FormControl, Row, ListGroup } from 'react-bootstrap'
import { FaBeer, FaTrashAlt, FaCheck } from 'react-icons/fa'
import { getAuth } from "firebase/auth"
import { getFirestore, collection, doc, setDoc, getDoc, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";

const TodosComponent = props => {
  const todos = props.todos;
  
  return (
    <div>
      <ListGroup>
        {todos.map(todo => {
          return (
           <TodoItemComponent todo={todo} key={todo.id}/>
          );
        })}
      </ListGroup>
    </div>
  );
}

const toggleImportant = async (todoId, important) => {
  console.log('toggle: ', todoId);
  const db = getFirestore();
  const auth = getAuth();
  const newImportant = !important;

  try {
    const todoRef = doc(db, "users3", auth.currentUser.uid, "todos", todoId);
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
    const todoRef = doc(db, "users3", auth.currentUser.uid, "todos", todoId);
    await setDoc(todoRef, { completed: newCompleted }, { merge: true});
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

        {/* <Button
          className="me-2"
          variant={todo.completed ? 'success' : 'outline-success'}
          onClick={() => toggleCompleted(todo.id, todo.completed)}
        >
          <FaCheck />
        </Button> */}

        <Button variant="danger"><FaTrashAlt /></Button>
      </div>
    </ListGroup.Item>
  )
}

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      todos: [],
      order: 'important'
    }
  }

  componentDidMount() {
    this.getTodos();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange = (event) =>  {
    this.setState({value: event.target.value})
  }

  handleAddTodo = (event) => {
    this.setState({value: event.target.value})

    if (this.state.value.length > 2) {
      
      const todo = this.state.value;
      const userId = getAuth().currentUser.uid;
      this.addTodo(userId, todo);
    } else {
      console.log("input to short");
    }
  }

  getTodos = async () => {
    const order = this.state.order;
    console.log('getting todos, oderd by: ' + order);
    const db = getFirestore();
    const q = query(collection(db, "users3", getAuth().currentUser.uid, "todos" ), orderBy("completed", "asc"), orderBy(order, "desc"));
    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        const id = doc.id;
        todos.push({id, ...doc.data()});
      });
      console.log("todos: ", todos);
      this.setState({ todos });
    })
  }

  addTodo = async (userId, todo) => {
  
    const db = getFirestore();
    const todoData = {
      todo: todo,
      completed: false,
      important: false,
      createdAt: serverTimestamp(),

    }
    try {
      const docRef = await addDoc(collection(db, "users3", userId, "todos"), todoData);
      console.log("document written with id: ", docRef.id);
    } catch (err) {
      console.log(err);
    } 
  }

  handleToggleImportant = async (todoId) => {
    console.log(todoId);
  }
  
  render() {
    return (
      <Container className="align-items-center justify-content-center mt-5">
        <Row>
          <div className="inputField">  
            <InputGroup className="mb-3 mt-3">
              <FormControl value={this.state.value} onChange={this.handleChange} type="text">
              </FormControl>
              <Button variant="primary" onClick={this.handleAddTodo} >
                Add
              </Button>
            </InputGroup>
          </div>
        </Row>
        <Row>
          <div className="todos">
            <TodosComponent todos={this.state.todos}/>
          </div>
        </Row>
      </Container>
    )
  }
  
}
