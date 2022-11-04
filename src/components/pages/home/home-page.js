import React from "react";
import { connect } from 'react-redux';
import './home-page.css'
import { bindActionCreators } from "redux";
import * as actions from "../../../action/actions";
import Sidebar from "../../sidebar/sidebar";
import BannerHome from "../../banner-home/banner-home";
import ListFeed from "./list-feed";
import ArticlesListGlobal from "./list-articles";

const HomePage = () =>{
  


  return (
    <div className="home-page">

  <BannerHome />

  <div className="container page">
      <div className="row">

          <div className="col-md-9">
              <div className="feed-toggle">
                  <ul className="nav nav-pills outline-active">
                      <ListFeed />
                  </ul>
              </div>
        
              <ArticlesListGlobal />


          </div>

          <Sidebar />

      </div>
  </div>

</div>
  )
}

const mapStateToProps = ({loginIn}) =>{
  return{
    loginIn
  }
}


export default connect(mapStateToProps)(HomePage)