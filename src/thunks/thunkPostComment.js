import { setCommentsArticle, onLoading, hideLoading, deleteTextarea } from "../action/actions"
import ArticlesStoreServices from "../services/articles-store-services";

const articlesStoreServices = new ArticlesStoreServices()

export const thunkPostComments = (slug, valueTextarea, commentsArray) => async (dispatch) => {

  const body = {
    comment: {
      body: valueTextarea
    }
  }

  dispatch(onLoading())
  dispatch(deleteTextarea())
  try {
    const data = await articlesStoreServices.postComment(slug, body)
    
    const newComments = [
      ...commentsArray,
      data.comment
    ]
    dispatch(setCommentsArticle(newComments))

  } catch (err) {
    console.log(err + 'Ошибка при пост')
  }
  dispatch(hideLoading())

}