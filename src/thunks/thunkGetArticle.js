import { hideLoading, onLoading, setArticleOnPage } from "../action/actions"
import BlogServicesApi from "../services/blog-services";

const blogServicesApi = new BlogServicesApi()

export const thunkGetArticle = () => async (dispatch) => {

  dispatch(onLoading())

  try {
    const url = String(window.location)
    const id = url.substring(url.lastIndexOf('/') + 1);
    const data = await blogServicesApi.getArticle(id)
    
    dispatch(setArticleOnPage(data))
    

  } catch (error) {
    console.log(error);
  }

  dispatch(hideLoading())
}