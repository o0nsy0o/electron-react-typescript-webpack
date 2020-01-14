import * as React from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { Home } from './views';
export default (
    <Router>
        <Switch>
            <Route exact={true} component={Home} />
        </Switch>
    </Router>
);
