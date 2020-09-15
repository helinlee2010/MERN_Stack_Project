import React, { useState, useContext } from 'react';
import { UserContext } from '../App'
import '../App.css'
import { Link, useHistory } from 'react-router-dom';
import { TextField, Button } from "@material-ui/core";
import axios from 'axios';
import Alert from './Alert'

export default function Login() {
    // Login component will re-render when context value changes
    const {state, dispatch} = useContext(UserContext)

    let history = useHistory();
    const [userInfo, setUserInfo ] = useState({
        usernameLogIn: '',
        passwordLogIn: ''
    });


    // Indicate the initial login state
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const successMsg = 'Successfully logged in! Redirecting to home page...' 

    const handleFieldChange = (target) => {
        setUserInfo(prev => ({
            ...prev,
            [target.id]: target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/users/login', {
            username: userInfo.usernameLogIn,
            password: userInfo.passwordLogIn
        })
            .then(res => {
                console.log(res.data)
                localStorage.setItem('jwt', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                
                // dispatch: go to the userReducer 
                dispatch({
                    type:'USER',
                    payload: res.data.user
                })

                setSuccess(true)
                setTimeout(()=>history.push('/'), 2500)
            })
            .catch( err => {
                console.log(err.response.data.msg)
                setFail(true);
            });
    } 

    return (
        <div>
            <h1> Login Form </h1>
            {success&& <Alert msg={successMsg} severity='success'/>}
            {fail&& <Alert msg='Invalid password or username' severity='error'/>}
            <form onSubmit={e => handleSubmit(e)}>
                <TextField required label='Username'
                    autoComplete='on'
                    id='usernameLogIn'  
                    value={userInfo.usernameLogIn}
                    onChange={ e => handleFieldChange(e.target)} 
                />
                <br />
                <br />
                <TextField required label='Password' 
                    type='password'
                    autoComplete='off'
                    id='passwordLogIn'
                    value={userInfo.passwordLogIn}
                    onChange={ e => handleFieldChange(e.target)} />
                <br />
                <br />
                <br />
                <Button type='submit' variant='contained' color='primary' disableElevation>Log In</Button>
                <br />
                <br />
                <p>Don't have an account? 
                    <span className='link-transfer'><Link to='/signup'>Sign up</Link></span>
                </p>
                
            </form>
        </div>
    )
}
