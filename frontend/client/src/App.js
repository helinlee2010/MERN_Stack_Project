import React, { useEffect, createContext, useReducer, useContext} from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Navbar from './components/Navbar';
import CreatePost from './components/CreatePost';
import AllPost from './components/AllPost'
import MyPost from './components/MyPost'
import { initialState, reducer } from './reducers/userReducer'

export const UserContext = createContext()

// To access the history

// If everything is wrapped inside Router, we cannot access the history
// history is above return()
// So move routes outside of Router first, & put them back in as package
const Routing = () => {
  const history = useHistory()
  const { state, dispatch} = useContext(UserContext)
  

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    // this 'user' in local storage is object written in String
    if(user){
      console.log("<Routing /> You are user & already logged in")
      dispatch({type:'USER', payload:user})
      // history.push('/home')
    }
    },[]);

  return(
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/signup' exact component={SignUp} />
      <Route path='/login' exact component={Login} />
      <Route path='/post/create' exact component={CreatePost} />
      <Route path='/post/mypost' exact component={MyPost} /> 
      <Route path='/post/all' exact component={AllPost} />
    </Switch>
  )
}


function App() {
  //when the state changes, the component will be re-rendered
  const [state, dispatch] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider value={{state,dispatch}}>
      <div className="App">
        <Router>
          <Navbar />
          <Routing />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
