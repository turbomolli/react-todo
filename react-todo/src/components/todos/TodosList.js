import { ListGroup } from 'react-bootstrap'
import TodoItemComponent from './TodosItem';

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

export default TodosComponent;