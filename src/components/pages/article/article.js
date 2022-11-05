import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import BlogServicesApi from "../../../services/blog-services"
import Spinner from "../../spinner/spinner"
import './article.css'

class ArticlePage extends Component {

    state = ''

    componentDidMount(){

if (this.state === ''){

    const  blogServicesApi = new BlogServicesApi()
    const url = String(window.location) 
    const slug = url.substring(url.lastIndexOf('/') + 1);
    
      blogServicesApi.getArticle(slug)
          .then(article => article.json())
          .then((data) => {
              this.setState({data})
          })
}

    }

    render(){

        if (this.state === ''){
            return(
                <Spinner />
            )
         }

        const {author,body ,createdAt ,favorited ,favoritesCount, tagList ,title ,updatedAt} = this.state.data.article
       
        
        return(

<div className="article-page">

<div className="banner">
    <div className="container">

        <h1>{title}</h1>

        <div className="article-meta">
            <Link to={`/`}><img src={author.image}/></Link>
            <div className="info">
                <Link  to={`/@${author.username}`} className="author">{author.username}</Link>
                <span className="date">{new Date(createdAt).toDateString()}</span>
            </div>
            
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
