import { onLoading, articlesLoaded, hideLoading } from "../action/actions"
import ArticlesStoreServices from "../services/articles-store-services"

const articlesStoreServices = new ArticlesStoreServices()

export const thunkGetListArticles = () => async (dispatch) => {

  dispatch(onLoading())

  try {
    await articlesStoreServices.getArticles().then((data) => {
        dispatch(articlesLoaded(data))
      })
  } catch (error) {
    console.log(error);
  }

  dispatch(hideLoading())
}