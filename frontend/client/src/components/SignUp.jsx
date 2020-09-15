import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TextField, Button } from "@material-ui/core";
import axios from 'axios';
import Alert from './Alert'

export default function SignUp() {
    let history = useHistory()
    const [fields, setFields] = useState({
        username:'',
        password:'',
        confirmedPassword:''
    });
    
    const [usernameOK,setUsernameOK] = useState(true);
    const [passwordOK,setPasswordOK] = useState(true);
    const [confirmedPasswordOK,setConfirmedPasswordOK] = useState(true);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

   
    function checkForm(){   

        if (fields.username.length>=6){
            setUsernameOK(true);
        }else{setUsernameOK(false);}

        if(fields.password.length>=6){
            setPasswordOK(true);
        }else{setPasswordOK(false);}

        if(fields.confirmedPassword===fields.password){
            setConfirmedPasswordOK(true);
        }else{setConfirmedPasswordOK(false);}
    }
   

    function handleSubmit(event){
        event.preventDefault();
        checkForm();

        const { username, password, confirmedPassword } = fields;
    
        if(username.length>=6 && password.length>=6 && password === confirmedPassword){
            console.log('About to send to backend');
            axios.post('http://localhost:5000/users/add', {
                username: username,
                password: password
            })
                .then(res => {
                    console.log(res.data.msg);
                    setSuccess(true);

                    setTimeout(()=>history.push('/home'), 7000)
                    // history.push('/home') 提示还没出来就换页了
                })
                .catch(err => {
                    console.log(err.response);
                    setFail(true);
                    //可以console 但alert会变成[object Object]
                });
        }
    }
        
    

    function handleFieldChange(e){
        setFields({
            ...fields,
            [e.target.id]: e.target.value
        });
    }

    return (
        <div>
            <h1> Sign Up Form </h1>
            {(success)&& <Alert msg="Your account has been successfully created!" severity='success'/>}
            {(fail)&& <Alert msg="Oops! Your username might be occupied. Please try choosing another one." severity='error'/> }
            <form onSubmit={e => handleSubmit(e)}>
                <TextField required label='Username'
                    id='username' value={fields.username} 
                    onChange={e =>handleFieldChange(e)} 
                    error={usernameOK? false: true}
                    helperText={usernameOK?"" : "Username should be at least 6 characters"}
                />
                <br />
                <br />
                <TextField required label='Password'
                    //  type='password'
                    id='password' value= {fields.password} 
                    onChange={e => handleFieldChange(e)}
                    error={passwordOK? false: true}
                    helperText={passwordOK? "": "Password should be at least 6 characters"}
                />
                <br />
                <br />
                <TextField required label='Confirm password' 
                    // type='password' 
                    id='confirmedPassword'
                    value={fields.confirmedPassword} 
                    onChange={ e => handleFieldChange(e)}
                    error={confirmedPasswordOK? false: true}
                    helperText={confirmedPasswordOK? "": "This should match with the password above"}
                />
                <br />
                <br />
                <br />
                <Button variant='contained' color='primary' 
                disableElevation 
                type='submit'>Sign Up</Button>
                <br />
                <br />
                <p>Already have an account?
                    <span className='link-transfer'><Link to='/login'>Log in</Link></span>
                </p>
            </form>
        </div>
    )
}