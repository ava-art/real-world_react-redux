import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import BlogServicesApi from "../../../services/blog-services"


class ArticlePage extends Component {

    state = {
        author: {},
        body : '',
        createdAt: "" ,
        description : "",
        favorited : null,
        favoritesCount : null,
        slug : "",
        tagList : [],
        title : "",
        updatedAt: ''
    }

    componentDidMount(){
      const  blogServicesApi = new BlogServicesApi()
      const url = String(window.location) 
      const slug = url.substring(url.lastIndexOf('/') + 1);
      
        blogServicesApi.getArticle(slug)
            .then(article => article.json())
            .then((data) => {
                
               const {author,body ,createdAt ,description ,favorited ,favoritesCount ,slug ,tagList ,title ,updatedAt} = data.article
                this.setState({
                    author,
                    body ,
                    createdAt ,
                    description ,
                    favorited ,
                    favoritesCount ,
                    slug ,
                    tagList ,
                    title ,
                    updatedAt
                })
                
            })

            
    }

    render(){
        const {author,body ,createdAt ,description ,favorited ,favoritesCount ,slug ,tagList ,title ,updatedAt} = this.state

        
        return(

<div className="article-page">

<div className="banner">
    <div className="container">

        <h1>{title}</h1>

        <div className="article-meta">
            <a href=""><img src={author.image}/></a>
            <div className="info">
                <a href="" className="author">{author.username}</a>
                <span className="date">{new Date(createdAt).toDateString()}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp;
                Follow {author.username} <span className="counter">({favoritesCount})</span>
            </button>
            &nbsp;&nbsp;
            {/* <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp;
                Favorite Post <span className="counter">(29)</span>
            </button> */}
        </div>

    </div>
</div>

<div className="container page">

    <div className="row article-content">
        <div className="col-md-12">
            <p>
                {body}
            </p>
            
        </div>
    </div>

    <hr/>

    <div className="article-actions">
        <div className="article-meta">
            <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
            <div className="info">
                <a href="" className="author">Eric Simons</a>
                <span className="date">January 20th</span>
            </div>

            <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp;
                Follow Eric Simons
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp;
                Favorite Post <span className="counter">(29)</span>
            </button>
        </div>
    </div>

    <div className="row">

        <div className="col-xs-12 col-md-8 offset-md-2">

            <form className="card comment-form">
                <div className="card-block">
                    <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
                </div>
                <div className="card-footer">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img"/>
                    <button className="btn btn-sm btn-primary">
                        Post Comment
                    </button>
                </div>
            </form>

            <div className="card">
                <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                    <a href="" className="comment-author">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img"/>
                    </a>
                    &nbsp;
                    <a href="" className="comment-author">Jacob Schmidt</a>
                    <span className="date-posted">Dec 29th</span>
                </div>
            </div>

            <div className="card">
                <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                    <a href="" className="comment-author">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img"/>
                    </a>
                    &nbsp;
                    <a href="" className="comment-author">Jacob Schmidt</a>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
          <i className="ion-edit"></i>
          <i className="ion-trash-a"></i>
        </span>
                </div>
            </div>

        </div>

    </div>

</div>

</div>
  )
    }

  
}



export default ArticlePage 
