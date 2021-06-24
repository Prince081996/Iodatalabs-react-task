import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import {PrivateRoute} from './helper/PrivateRoute';
import { history } from './common/History';
import SignInForm from "./SignIn/SignInForm";
import SignUpForm from "./SignUp/SignUpForm";
import CreateTodo from "./CreateTodo/CreateTodo";
import NotFound from "./NotFound";
import TodoLists from "./TodosList/TodosList";
import TodoDetail from "./TodoDetail";
import StatsScreen from './StatsScreen';



function Routes() {
    return (
        <Switch>
          <Route  path="/login" exact component={SignInForm} history={history} />
          <Route exact path="/signup" component={SignUpForm} history={history} />
          <PrivateRoute  path="/stat-screen" exact component={StatsScreen} history={history} />
          <PrivateRoute path='/' component={TodoLists} exact={true}  history={history}/>
          <PrivateRoute path='/create-todo' component={CreateTodo} exact={true} history={history} />
          <PrivateRoute path='/todo-detail/:id' component={TodoDetail} exact={true} />
          <Route path='/not-found' exact component={NotFound}  />
          <Redirect to='/not-found' />
        </Switch>
    )
}

export default Routes
