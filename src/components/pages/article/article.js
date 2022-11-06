import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import BlogServicesApi from "../../../services/blog-services"
import Spinner from "../../spinner/spinner"
import './article.css'
import CommentsArticle from "./comments-article"
import ArticlesStoreServices from "../../../services/articles-store-services"
import { commentsLoaded } from "../../../action/actions"

class ArticlePage extends Component {

    state = ''

    componentDidMount(){
        const url = String(window.location) 
        const slug = url.substring(url.lastIndexOf('/') + 1);

if (this.state === ''){

    const  blogServicesApi = new BlogServicesApi()
    
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

        const {author,body, slug ,createdAt ,title} = this.state.data.article
       
        
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
    
    <CommentsArticle />

</div>

</div>
  )
    }

  
}
const mapStateToProps = ({loading, comments}) =>{
    return {
      loading,
      comments
    }
  }
//   const mapDispatchToProps = (dispatch) =>{
//     return{
//       commentsLoaded: (comments) => dispatch(commentsLoaded(comments))
//     }
//   }


export default connect(mapStateToProps)(ArticlePage)
