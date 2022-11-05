import {React, Fragment, Component} from "react";
import Spinner from "../../spinner/spinner";
import withBlogServices from '../../hoc/withBlogServices';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TagList from "./tag-list"
import { articlesLoaded, updateArticleLike } from "../../../action/actions";
import { bindActionCreators } from "redux";




class ArticlesListGlobal extends Component{
  

componentDidMount(){
  const {articlesStoreServices} = this.props
  articlesStoreServices.getArticles().then((data) => {
    
    return(
      this.props.articlesLoaded(data)
    )
  })
}

onFavorit = (articlesList,slug) =>{
  

  let method = 'POST'
    articlesList.map(el => {
      if(el.slug === slug){
        if (el.favorit){
          method = 'DELETE'
        }
      }
    })
    
  
    this.props.articlesStoreServices.postFavorit(slug, method)
      .then(data => data.json())
        .then(article => {
          const newArticle = {
            slug: article.article.slug,
            title: article.article.title,
            likes: article.article.favoritesCount,
            favorit: article.article.favorited,
            createdAt: article.article.createdAt,
            description: article.article.description,
            img: article.article.author.image,
            username: article.article.author.username,
            taglist: article.article.tagList,
            following: article.article.author.following
          }
          this.props.updateArticleLike(newArticle)
          
        })
  
}

  render(){
    
  const {articlesList, loading} = this.props
  
    let classFavorit = ''
      if (articlesList && articlesList.favorit){
        classFavorit = 'favorit-active'
      }

      if (loading){
        return(
          <Spinner />
        )
      }
  
  
  return(
    <ul>
      {
        articlesList.map((el) =>{
          const {slug, title, likes, favorit, taglist, createdAt, description, img, username} = el
          return(
            <li key={slug}>

                  <div className="article-preview">
                      <div className="article-meta">
                          <a href="profile.html"><img src={img}/></a>
                          <div className="info">
                              <Link to={`/@${username}`} href="" className="author">{username}</Link>
                              <span className="date">
                              {new Date(createdAt).toDateString()}
                                </span>
                          </div>
                          <button 
                              
                              className={`btn btn-outline-primary btn-sm pull-xs-right btn-like 
                                              ${favorit ? `favorit-active` : ``}`}
                                onClick={() => this.onFavorit(articlesList,slug)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 512 512"><path fill="green" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                            {likes}
                          </button>
                      </div>
                      <Link to={`/articles/${slug}`} className="preview-link">
                          <h1>{title}</h1>
                          <p>{description}</p>
                      </Link>
                      <div className="tags-wrapper">
                        <Link to={`articles/${slug}`} className="preiew-link">
                            <span>Read more...</span>
                            </Link> 
                      <ul className="tag-list">
                          {taglist.map((tag) => {
                            return(
                            <li className="tag-default tag-pill tag-outline" key={tag}>
                              {tag}
                            </li> 
                            )}
                          )}
                        </ul> 
                      </div>
                          
                  </div>
            </li>
          )
        })
      }   
    </ul>
  )
}
}

const mapStateToProps = ({articlesList, loading}) =>{
  return{
    articlesList,
    loading
  }
}
const mapDispatchToProps = (dispatch    ) =>{
  
  return{
    articlesLoaded: (newArticle) => dispatch(articlesLoaded(newArticle)) ,
    updateArticleLike: (newArticle) => dispatch(updateArticleLike(newArticle)) 
    }
  }

  

export default withBlogServices()(connect(mapStateToProps, mapDispatchToProps)(ArticlesListGlobal))