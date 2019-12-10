import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../redux/reducer'

class Landing extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    handleInput = (event) => {
        console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleLogin = () => {
        axios.post('/api/login', {email: this.state.email, password: this.state.password}).then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/dash')
        })
        .catch(err => console.log(err))
    }
    render(){
        return(
            <div>
                <input maxLength='100'
                 placeholder='Enter ya email'
                 name='email'
                 onChange={(event) => this.handleInput(event)}/>
                <input maxLength='20' 
                 placeholder='enter ya password'
                 type='password'
                 name='password'
                 onChange={(event) => this.handleInput(event)}/>
                 <button onClick={this.handleLogin}>Log in</button>
                <Link to='/register'>Register</Link>
            </div>
        )
    }
}

export default connect(null,{getUser})(Landing);