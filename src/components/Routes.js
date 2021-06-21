import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import {PrivateRoute} from './helper/PrivateRoute';
import { history } from './common/History';
import SignInSide from "./SignInForm";
import SignUpSide from "./SignUpForm";
import CreateTodo from "./CreateTodo";
import NotFound from "./NotFound";
import TodoLists from "./TodoLists";
import TodoDetail from "./TodoDetail";


function Routes() {
    return (
        <Switch>
          <Route  path="/login" exact component={SignInSide} history={history} />
          <Route exact path="/signup" component={SignUpSide} history={history} />
          <PrivateRoute path='/' component={TodoLists} exact={true}  history={history}/>
          <PrivateRoute path='/create-todo' component={CreateTodo} exact={true} history={history} />
          <PrivateRoute path='/todo-detail/:id' component={TodoDetail} exact={true} />
          <Route path='/not-found' exact component={NotFound}  />
          <Redirect to='/not-found' />
        </Switch>
    )
}

export default Routes
