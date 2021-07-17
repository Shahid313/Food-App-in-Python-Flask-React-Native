import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Update from './components/Update';
import Orders from './components/Orders';

function App() {
  return (
    <div>
     <Router>
       <div className="navbar">
         <a href="/">Dashboard</a>
         <a href="/orders">Orders Recieved</a>
       </div>
       <Switch>
       <Route path="/" exact render={() => (<Home/>)}/>
       <Route path="/update/:id" exact render={() => (<Update/>)}/>
       <Route path="/orders" exact render={() => (<Orders/>)}/>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
