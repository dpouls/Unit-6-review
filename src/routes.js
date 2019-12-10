import React from 'react' // any time you are gonna use jsx

import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'

export default (
    // switch is kind of like an if statement
    <Switch> 
        <Route exact path='/' component={Landing}/>
        <Route path='/register' component={Register}/>
        <Route path='/dash' component={Dashboard}/>
        <Route path='/profile' component={Profile}/>
    </Switch>
)

 