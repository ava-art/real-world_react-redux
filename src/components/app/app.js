import { React, Fragment, useEffect} from 'react';
import './app.css';
import Header from '../header/header';
import HomePage from '../pages/home/home-page';
import {createStore, bindActionCreators} from 'redux'
import reduser from "../../reduser/reduser";
import Login from '../pages/loggin/login';
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/register/register';
import ArticlePage from '../pages/article/article';
import Settings from '../pages/settings/settings';
import { connect } from 'react-redux';
import Profile from '../pages/profile/profile';
import { userActivited } from '../../action/actions';
import BlogServicesApi from '../../services/blog-services';

const App = ( {userActivited}) =>{


    const blogServiceApi = new BlogServicesApi()

  const authenticateUser = () => { 
    blogServiceApi.fetchDataUser()
        .then(data =>{
          return userActivited(data)
        })
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
    userActivited: (user) => dispatch(userActivited(user)),
    
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App)
