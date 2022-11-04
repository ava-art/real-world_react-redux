import {React, Fragment} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ListFeed = ({loginIn, tag}) =>{
let viewTag = 'nav-list_tag'
  if (tag !== ''){
    viewTag = 'nav-list_tag-active'
  }
  if (loginIn){
    return(
      <Fragment>
              <li className="nav-item">
                  <Link to="/" className="nav-link">Your Feed</Link>
              </li>
              <li className="nav-item">
                  <Link to="/" className="nav-link">Global Feed</Link>
              </li>
              <li className={`nav-item ${viewTag}`}>
                  <span to="/" className="nav-link">{`#${tag}`}</span>
              </li>
    </Fragment>
    )
  } else{
    return(
      <Fragment>
        <li className="nav-item">
                  <a className="nav-link active" href="">Global Feed</a>
              </li>
      </Fragment>
    
  )
  }

  
}

const mapStateToProps = ({loginIn, tag}) =>{
  return{
    loginIn,
    tag
  }
}

export default connect(mapStateToProps)(ListFeed)
