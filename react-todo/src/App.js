import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Todos from './components/Todos';
import Mainnav from './components/Mainnav';


function App() {

  const [user, loading, error] = useAuthState(getAuth());

  console.log(user?.displayName);
  console.log(loading);

  let route;
  if (user) {
    route = <Route exact path="/" component={Todos} />
  } else {
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
