import { React, Fragment, useEffect} from 'react';
import './app.css';
import Header from '../header/header';
import HomePage from '../pages/home/home-page';
import {createStore, bindActionCreators} from 'redux'
import reduser from "../../reduser/reduser";
import * as actions from "../../action/actions";
import Login from '../pages/loggin/login';
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/register/register';
import ArticlePage from '../pages/article/article';
import Settings from '../pages/settings/settings';
import { connect } from 'react-redux';
import Profile from '../pages/profile/profile';



const store = createStore(reduser)
const {dispatch} = store 

const {inc} = bindActionCreators(actions, dispatch)
const update = () =>{
  return console.log(store.getState())
}
store.subscribe(update)



const App = ( {userActivited}) =>{

  
      const  authenticateUser = () =>{
          const token = localStorage.getItem('jwt')
          if (token) {
            function parseJwt (token) {
            let base64Url = token.split('.')[1];
            let base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(base64);
              };
          const tokenJSON = parseJwt(token)
          
          const data = { user: {
              bio: null,
              email: tokenJSON.email,
              image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
              token,
              username: tokenJSON.username
              }}
          userActivited(data)
        }
          }
          

useEffect( authenticateUser, [])

  

  
  return(
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/articles/:article" element={<ArticlePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/@:username" element={<Profile />} />


      </Routes>
    </Fragment>
  )
}

const mapStateToProps = ({user}) =>{
  return{
    user
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    userActivited: (user) =>{
      dispatch({
        type: 'USER_ACTIVITED',
        payload: user
      })
  }
}
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
