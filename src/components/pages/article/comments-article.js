import { connect } from "react-redux";
import Spinner from "../../spinner/spinner";
import ArticlesStoreServices from "../../../services/articles-store-services"
import { commentsLoaded, onLoading } from "../../../action/actions"
import { useEffect } from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

class CommentsArticle extends Component {

  state = {
    comments: [],
    textarea : '',
    loading: true

  }
  

   componentDidMount(){
    const url = String(window.location)
    const slug = url.substring(url.lastIndexOf('/') + 1);
    const articlesStoreServices = new ArticlesStoreServices();
    
        articlesStoreServices.getComments(slug)
              .then(data => {
                const commentArray = data.comments
                  this.setState({
                    comments: commentArray,
                    loading: false
                  })
              })     
   }
  
    postComments = async (event)=>{
      event.preventDefault()
    const url = String(window.location)
    const slug = url.substring(url.lastIndexOf('/') + 1);
    const articlesStoreServices = new ArticlesStoreServices()
    const body = {
      comment: {
        body: this.state.textarea
      }

    }
    
    try {
      const data = await articlesStoreServices.postComment(slug, body)
      this.setState(({comments}) => {
        const newComments = [
          ... comments,
          data.comment
        ]
        return{
          comments: newComments,
          textarea: ''
        }
      })
   
    } catch(err){
      console.log(err  + 'Ошибка при пост')
    }
  
             
  }
 
    setTextArea = (e) =>{
    this.setState({
      textarea: e.target.value
    })
  }
  
    deleteComment = async (id)=>{
      const url = String(window.location)
      const slug = url.substring(url.lastIndexOf('/') + 1);
      const articlesStoreServices = new ArticlesStoreServices()

      try {
        await articlesStoreServices.deleteComment(slug, id)
        this.setState(({comments})=>{
          const idx = comments.findIndex(((el) => el.id === id))
          
          const newArr = [
            ...comments.slice(0, idx),
            ...comments.slice(idx+1)
          ]
          return {
            comments: newArr
          }
        })
      } catch(err){
        console.log(err);
      }

    }
  
   render(){
    
    const {comments, loading} = this.state
    const {user} = this.props
    

    if(loading || !comments || comments === undefined){
      return(
        <Spinner />
      )
    }

      return(
      <div className="row">

          <div className="col-xs-12 col-md-8 offset-md-2">

              <form onSubmit={this.postComments} className="card comment-form">
                  <div className="card-block">
                      <textarea className="form-control" 
                      placeholder="Напишите комментарий ..." 
                      rows="3"
                      value={this.state.textarea}
                      onChange={this.setTextArea}>
                        
                      </textarea>
                  </div>
                  <div className="card-footer">
                      <img src={user.user.image} className="comment-author-img"/>
                      <button className="btn btn-sm btn-primary" type="submit">
                          Отправить комментарий
                      </button>
                  </div>
              </form>

              {comments.map(({author, body, createdAt, id, updateAt}) => {
                  
                return(
                  <div className="card" key={id}>
                  <div className="card-block">
                      <p className="card-text">{body}</p>
                  </div>
                  <div className="card-footer">
                      <Link to={`/@${author.username}`} className="comment-author">
                          <img src={author.image} className="comment-author-img"/>
                      </Link>
                      &nbsp;
                      <Link to={`/@${author.username}`} className="comment-author">{author.username}</Link>
                      {(author.username === user.user.username) ?
                        <button className="comment-trash" onClick={() => this.deleteComment(id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width={10} viewBox="0 0 448 512"><path fill="#919191" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        </button>
                        : null
                      }
                      <span className="date-posted">{new Date(createdAt).toDateString()}</span>

                  </div>
              </div>
                )
              })}
              
          </div>
      </div>
    )
   }
}

const mapStateToProps = ({loading, comments, user}) =>{
  return {
    loading,
    comments,
    user
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    commentsLoaded: (comments) => dispatch(commentsLoaded(comments))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentsArticle)