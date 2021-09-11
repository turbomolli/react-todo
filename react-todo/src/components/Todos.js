import React, { Component } from 'react'
import { Container, InputGroup, Button, FormControl, Row, ListGroup } from 'react-bootstrap'
import { FaBeer, FaTrashAlt } from 'react-icons/fa'
import { getAuth } from "firebase/auth"
import { getFirestore, collection, doc, setDoc, getDoc, addDoc, serverTimestamp, query, where, onSnapshot } from "firebase/firestore";


const TodosComponent = props => {
  const todos = props.todos;
  
  return (
    <div>
      <ListGroup>
        {todos.map(todo => {
          return (
           <TodoItemComponent todo={todo} />
          );
        })}
      </ListGroup>
    </div>
  );
}

const TodoItemComponent = props => {
  const todo = props.todo

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <div>
       {todo.todo}
      </div>
      <div>
        <Button className="me-2" variant="warning"><FaBeer /></Button>
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
      todos: []
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
    console.log('getting todos');
    const db = getFirestore();
    const q = query(collection(db, "users3", getAuth().currentUser.uid, "todos" ));
    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        todos.push(doc.data());
      });
      console.log("todos: ", todos);
      this.setState({ todos });
    })
  }

  addTodo = async (userId, todo) => {
    console.log(userId);
    console.log(todo);

    const db = getFirestore();
    //const todoRef = doc(db, "users3", userId, "todos");
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
