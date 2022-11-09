import { hideLoading, onLoading, updateResponseStatus, clearInputsNewArticle } from "../action/actions"
import BlogServicesApi from "../services/blog-services";

const blogServiceApi = new BlogServicesApi()

export const thunkPostNewArticle = (bodyArticle) => async (dispatch) =>{

  dispatch(onLoading())
  try {
    const res = await blogServiceApi.postNewArticle(bodyArticle)
      dispatch(updateResponseStatus(res.status))    

  } catch (error) {
    console.log('Ошибка в thunkPostNewArticle' + error);
  }

  dispatch(hideLoading())
}