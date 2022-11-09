import { viewArticlesInProfile, onLoading, hideLoading } from "../action/actions"
import BlogServicesApi from "../services/blog-services"

const blogServicesApi = new BlogServicesApi()

export const thunkGetArticlesInProfile = (user, reqName, tabName) => async (dispatch) => {
  
  dispatch(onLoading())

  try {
    const data = await blogServicesApi.getAllArticles(user, reqName)
    dispatch(viewArticlesInProfile(data, tabName))
  } catch (err) {
    console.log(err);
  }
  dispatch(hideLoading())

}