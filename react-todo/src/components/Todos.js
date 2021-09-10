import React, { Component } from 'react'
import { Container, InputGroup, Button, FormControl } from 'react-bootstrap'
import { getAuth } from "firebase/auth"
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";

// const inputField = (
//   <InputGroup className="mb-3 mt-3">
//     <FormControl value={this.state.value} onChange={this.handleChange} type="text">
//     </FormControl>
//     <Button variant="primary" onClick={this.handleAddTodo} >
//       Add
//     </Button>
//   </InputGroup>
// )

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
  }

  handleChange = (event) =>  {
    this.setState({value: event.target.value})
  }

  handleAddTodo = (event) => {
    this.setState({value: event.target.value})
    console.log(this.state.value);
    console.log(getAuth().currentUser.uid);
  }
  
  render() {
    return (
      <Container className="d-flex align-items-center justify-content-center mt-5">
        <div className="inputField">  
           <InputGroup className="mb-3 mt-3">
            <FormControl value={this.state.value} onChange={this.handleChange} type="text">
            </FormControl>
            <Button variant="primary" onClick={this.handleAddTodo} >
              Add
            </Button>
          </InputGroup>
        </div>
      </Container>
    )
  }
  
}
