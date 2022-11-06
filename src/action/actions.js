const articlesLoaded = (newArticle,tag,tab) =>{
  return {
    type: 'ARTICLES_LOADED',
    payload: newArticle
  }
}
const userActivited = (user) =>{
  return{
    type: 'USER_ACTIVITED',
    payload: user
  }
}
const viewArticleForTag = (articleListForTag) =>{
  return{
    type: 'VIEW_ARTICLE_FOR_TAG',
    payload: articleListForTag
  }
}
const onLoading = (tagName) =>{
  return{
    type: 'ON_LOADING',
    tagName
  }
}
const updateArticleLike = (newArticle, slug) =>{
  return{
    type: 'UPDATE_ARTICLE_LIKE',
    payload: newArticle,
    slug
  }
}
const updateTab = (newArticles, tab, tag) =>{
  return{
    type: 'UPDATE_TAB',
    payload: newArticles,
    tab,
    tag
  }

}
const commentsLoaded = (comments) =>{
  return{
    type: 'COMMENTS_LOADED',
    payload: comments
  }
}

export {
  articlesLoaded,
  userActivited,
  viewArticleForTag,
  onLoading,
  updateArticleLike,
  updateTab,
  commentsLoaded
}