import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth';

import Login from './pages/Login';
import Pesquisa from './pages/Pesquisa';
import Logout from './pages/Logout';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/pesquisa" component={Pesquisa}/>
            <Route exact path="/logout" component={Logout} />
        </Switch>
    </Router>
);

export default Routes;