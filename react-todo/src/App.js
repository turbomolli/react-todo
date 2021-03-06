import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import Login from './components/Login';
import Todos from './components/todos/Todos';
import Mainnav from './components/Mainnav';


function App() {

  const [user, loading, error] = useAuthState(getAuth());

  let route;
  if (user) {
    route = <Route exact path="/" component={Todos} />
  } else if (!loading) {
    route = <Route exact path="/" component={Login} />
  }

  return (
    <div className="App">
      <Mainnav user={user}/>
      <Router>
        <Switch>
          {route}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
