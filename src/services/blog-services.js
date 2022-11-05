export default class BlogServicesApi {


  fetchDataLogin = async function(user) {
    const reqData = {user}
    const request = JSON.stringify(reqData)
    const response = await fetch('https://api.realworld.io/api/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
        },
        body: request
    })
    const resData = await response.json()

    return resData
  }

  fetchDataUserUpdate = async function(user) {
    const reqData = {user}
    const request = JSON.stringify(reqData)
    const response = await fetch('https://api.realworld.io/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          "accept": "application/json",
        "Authorization": 'Token ' + localStorage.getItem('jwt').match(/(["'])(.+?)\1/)[2]
          }, 
        body: request
    })
    const resData = await response.json()

    return resData
  }

  onFollowUser = async function(user, method) {
  
  
  const response = await fetch(`https://api.realworld.io/api/profiles/${user}/follow`, {
      method: method,
      headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          "Authorization": 'Token ' + localStorage.getItem('jwt').match(/(["'])(.+?)\1/)[2]
      }
  })
    return  await response.json()
  
  }

  fetchDataUser = async function(){
    const response = await fetch('https://api.realworld.io/api/user',
          {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          "Authorization": 'Token ' + localStorage.getItem('jwt').match(/(["'])(.+?)\1/)[2]
    }
  })

  return response.json()
  }

  getUserProfile = async function(username){
    const response = await fetch(`https://api.realworld.io/api/profiles/${username}`,{
      headers:{
          'Content-Type': 'application/json; charset=utf-8',
          "Authorization": 'Token ' + localStorage.getItem('jwt').match(/(["'])(.+?)\1/)[2]
      }
    })
      
    return response
  }

  //  GET Article //

  getArticle = async (slug) =>{
    const res = await fetch(`https://api.realworld.io/api/articles/${slug}`,{
      headers:{
        'Content-Type': 'application/json; charset=utf-8',
        "Authorization": 'Token ' + localStorage.getItem('jwt').match(/(["'])(.+?)\1/)[2]
    }
    }
    
    )
    return res
  }

  getAllArticles = async (nameTag) =>{
    const res = await fetch(`https://api.realworld.io/api/articles?tag=${nameTag}&limit=20&offset=0`)
        .then(data => data.json())


    return res.articles.map(this._transformArticles)
  }
  // GET Tag List //

  getTags = async () =>{
    const res = await fetch('https://api.realworld.io/api/tags')
       
      return res.json()
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
      taglist: articles.tagList

    }
  }


}