import { connect } from "react-redux"
import { commentsLoaded } from "../../../action/actions"
import ArticlesStoreServices from "../../../services/articles-store-services"

const commentsArticleLogik = (slug) =>{


  const articlesStoreServices = new ArticlesStoreServices()

  articlesStoreServices.getComments(slug)
      .then(data => {
        commentsLoaded(data)
      })
      

}

const mapStateToProps = (loading) =>{
  return(
    loading
  )
}
const mapDispatchToProps = (dispatch) =>{
  return{
    commentsLoaded: (commentsArr) => dispatch(commentsLoaded(commentsArr))
  }
}

export default connect(mapStateToProps)(commentsArticleLogik)