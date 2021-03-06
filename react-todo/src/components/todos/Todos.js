import React, { Component } from 'react'
import { Container, InputGroup, Button, FormControl, Row, ProgressBar } from 'react-bootstrap'
import { getAuth } from "firebase/auth"
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { FaPlus } from 'react-icons/fa';
import TodosComponent from './TodosList';


export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      todos: [],
      order: 'important',
      loading: false
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
    this.setState({ loading: true });
    const db = getFirestore();
    const q = query(collection(db, 'users3', getAuth().currentUser.uid, 'todos' ), orderBy(order, 'desc'), orderBy('createdAt', 'desc'));
    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        todos.push({id, ...doc.data()});
      });
      this.setState({ todos });
      this.setState({ loading: false });

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
      const docRef = await addDoc(collection(db, 'users3', userId, 'todos'), todoData);
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
      <Container className="align-items-center justify-content-center mt-4">
        <Row>
          <div className="inputField">  
            <InputGroup className="mb-3 mt-3">
              <FormControl value={this.state.value} onChange={this.handleChange} type="text">
              </FormControl>
              <Button variant="primary" onClick={this.handleAddTodo} >
                <FaPlus />
              </Button>
            </InputGroup>
          </div>
        </Row>
        <Row>
          {this.state.loading &&
            <ProgressBar animated now={100} />
          }
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
