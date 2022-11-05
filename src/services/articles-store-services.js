import { nanoid } from 'nanoid'

export default class ArticlesStoreServices {

  _apiBase = 'https://api.realworld.io/api'

  async getContent(url){
    const res = await fetch(`${this._apiBase}${url}`,{
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
      "Authorization": 'Token ' + localStorage.getItem('jwt').match(/(["'])(.+?)\1/)[2]
    }
  })
    if (!res.ok){
      throw new Error (`Ошибка в fetch по адресу ${url} статус ответа ${res.status}`)
    }
    return await res.json()
  }

  getArticles = async () =>{
    const res = await this.getContent(`/articles?limit=10&offset=0`)
    return res.articles.map(this._transformArticles)
  }

  postFavorit = async (slug) =>{
    const res = await fetch(`https://api.realworld.io/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          "Authorization": 'Token ' + localStorage.getItem('jwt').match(/(["'])(.+?)\1/)[2]
      }
  })

    return res
  }

  _transformArticles = (articles) =>{

    return{
     
      slug: articles.slug,
      title: articles.title,
      likes: articles.favoritesCount,
      favorit: articles.favorited,
      createdAt: articles.createdAt,
      description: articles.description,
      img: articles.author.image,
      username: articles.author.username,
      taglist: articles.tagList,
      following: articles.author.following

    }
  }



  
}
