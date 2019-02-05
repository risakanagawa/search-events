import React from "react";
import HomePage from './Home/HomePage' 
import Meetups from './Meetups/MeetupsPage' 
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
    <div>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/meetups' component={Meetups} />
      </Switch>
    </div>
  </BrowserRouter>
  );
};

export default App;
