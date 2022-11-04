import React, { Component } from "react";
import BlogServicesApi from "../../services/blog-services";
import Spinner from "../spinner/spinner";
import { connect } from "react-redux";
import {articlesLoaded, onLoading} from '../../action/actions'

class Sidebar extends Component{

  state={
    tags : []
  }
  blogServiceApi = new BlogServicesApi()

  componentDidMount(){

    this.blogServiceApi.getTags()
      .then(data => {
        this.setState({tags: data})
      })
  }

  setBtnTag = (tag) =>{

    this.props.onLoading()

    this.blogServiceApi.getAllArticles(tag)
      .then((data) => {
        this.props.articlesLoaded(data)
      })

    
  }

  render(){
    const {tags} = this.state
    
    

    if (tags.length === 0){
      return(
        <Spinner />
      )
    }


    return(
    <div className="col-md-3">
              <div className="sidebar">
                  <p>Популярные теги</p>
                  <div className="tag-list">
                    {tags.tags.map((tag, id) =>{
                      return(
                        <button key={id} onClick={() => this.setBtnTag(tag)} className="tag-pill tag-default">{tag}</button>
                      )
                    })} 
                  </div>
              </div>
          </div>
  )
}
  }

const mapStateToProps = () =>{
  return
}
const mapDispatchToProps = (dispatch) =>{
  return{
    onLoading: () => dispatch(onLoading()),
    articlesLoaded: (newArticles) => dispatch(articlesLoaded(newArticles))
  }
}
  

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)