import { hideLoading, onLoading, updateResponseStatus } from "../action/actions"
import BlogServicesApi from '../services/blog-services'

const blogServicesApi = new BlogServicesApi()

export const thunkDeleteArticle = (slug) => async (dispatch) =>{

  
  try {
    const res = await blogServicesApi.deleteArticle(slug)
    dispatch(updateResponseStatus(res.status))


  } catch (error) {
    console.log(error);
  }

  
}