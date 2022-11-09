import { setCommentsArticle, onLoading,hideLoading } from "../action/actions"
import ArticlesStoreServices from "../services/articles-store-services";

const articlesStoreServices = new ArticlesStoreServices();

export const thunkGetComments = (slug) => async (dispatch) =>{
  dispatch(onLoading())
  try{
    const data = await articlesStoreServices.getComments(slug)
    dispatch(setCommentsArticle(data.comments))
  }catch (err) {
    console.log(err);
  }
  dispatch(hideLoading())
}

