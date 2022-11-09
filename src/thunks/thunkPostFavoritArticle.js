import { updateArticleLike } from "../action/actions"
import ArticlesStoreServices from "../services/articles-store-services"

const articlesStoreServices = new ArticlesStoreServices()

export const thunkPostFavoritArticle = (articlesList, slug) => async (dispatch) => {
  let method = 'POST'
  articlesList.map(el => {
    if (el.slug === slug) {
      if (el.favorit) {
        method = 'DELETE'
      }
    }
  })
  

  try {

    await articlesStoreServices.postFavorit(slug, method)
      .then(data => data.json())
      .then(article => {
        const { slug, title, createdAt, description, author } = article.article
        const newArticle = {
          slug,
          title,
          likes: article.article.favoritesCount,
          favorit: article.article.favorited,
          createdAt,
          description,
          img: author.image,
          username: author.username,
          taglist: article.article.tagList,
          following: author.following
        }
        dispatch(updateArticleLike(newArticle))
      })

  } catch (error) {
    console.log(error);
  }

  

}