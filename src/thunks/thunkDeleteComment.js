import { setCommentsArticle, onLoading, hideLoading, deleteTextarea } from "../action/actions"
import ArticlesStoreServices from "../services/articles-store-services";

const articlesStoreServices = new ArticlesStoreServices()

export const thunkDeleteComment = (id, slug, comments) => async (dispatch) => {

  dispatch(onLoading())
  try {
    await articlesStoreServices.deleteComment(slug, id)

    const idx = comments.findIndex(((el) => el.id === id))

        const newArr = [
          ...comments.slice(0, idx),
          ...comments.slice(idx + 1)
        ]
    dispatch(setCommentsArticle(newArr))

  } catch (err) {
    console.log(err + 'Ошибка при пост')
  }
  dispatch(hideLoading())
}