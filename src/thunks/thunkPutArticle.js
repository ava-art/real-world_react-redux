import { hideLoading, onLoading, updateResponseStatus } from "../action/actions"
import BlogServicesApi from "../services/blog-services";

const blogServiceApi = new BlogServicesApi()

export const thunkPutArticle = (bodyArticle, slug) => async (dispatch) =>{

  dispatch(onLoading())
  
  try {
    const res = await blogServiceApi.putArticle(bodyArticle, slug)
      dispatch(updateResponseStatus(res.status))    

  } catch (error) {
    console.log('Ошибка в thunkPostNewArticle' + error);
  }

  dispatch(hideLoading())
}