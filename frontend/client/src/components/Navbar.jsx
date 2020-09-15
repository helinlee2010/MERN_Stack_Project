import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import '../App.css'
import { UserContext } from '../App'

export default function Navbar() {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)

    const renderList = () => {
        // If logged in, the state won't be null (initialState in reducer)
        if(state){
            //Logged in already, so display log out
            return([
                <Link to='/post/mypost'><li>My Post</li></Link>,
                <Link to='/post/create'><li>Create Post</li></Link>,    
                <Link to='/post/all'><li>Discover More</li></Link>,
                <Button 
                    onClick={()=>{
                        localStorage.clear()
                        dispatch({type:'CLEAR'})
                        setTimeout(()=>{history.push('/home')}, 2000)
                    }}
                >Log Out</Button>
            ])
        }else{
            // Not log in yet
            return([
                <Link to='/login'>
                    <li className='link-item'>Log In</li>
                </Link>,
                <Link to='/signup'>
                    <li className='link-item'>Sign Up</li>
                </Link> 
            ])
        }
    }
    return (
        <div className='navbar'>
            <ul className='navbar-link'>
                <h1 >Logo</h1>
                {
                    renderList()
                }
            </ul>
        </div>
    )
}
