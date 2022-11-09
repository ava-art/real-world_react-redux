const articlesLoaded = (newArticle) => {
  return {
    type: 'ARTICLES_LOADED',
    payload: newArticle
  }
}
const userActivited = (user) => {
  return {
    type: 'USER_ACTIVITED',
    payload: user
  }
}
const viewArticleForTag = (articleListForTag) => {
  return {
    type: 'VIEW_ARTICLE_FOR_TAG',
    payload: articleListForTag
  }
}
const onLoading = (tagName) => {
  return {
    type: 'ON_LOADING',
    tagName
  }
}
const hideLoading = () => {
  return {
    type: 'HIDE_LOADING'
  }
}
const updateArticleLike = (newArticle, slug) => {
  return {
    type: 'UPDATE_ARTICLE_LIKE',
    payload: newArticle,
    slug
  }
}
const updateTab = (newArticles, tab, tag) => {
  return {
    type: 'UPDATE_TAB',
    payload: newArticles,
    tab,
    tag
  }

}
const setCommentsArticle = (comments) => {
  return {
    type: 'SET_COMMENTS_ARTICLE',
    payload: comments
  }
}
const setTextarea = (text) => {
  return {
    type: 'SET_TEAXTAREA',
    payload: text
  }
}
const deleteTextarea = () => {
  return {
    type: 'DELETE_TEXTAREA'
  }
}
const viewArticlesInProfile = (listArticles, tabName) => {
  return {
    type: 'VIEW_ARTICLES_IN_PROFILE',
    payload: listArticles,
    tabName
  }
}
const setNewArticleTitle = (text) =>{
  return{
    type: 'SET_NEW_ARTICLE_TITLE',
    payload: text
  }
}
const setNewArticleDescription = (text) =>{
  return{
    type: 'SET_NEW_ARTICLE_DESCRIPTION',
    payload: text
  }
}
const setNewArticleBody = (text) =>{
  return{
    type: 'SET_NEW_ARTICLE_BODY',
    payload: text
  }
}
const setNewArticleTags = (text) =>{
  return{
    type: 'SET_NEW_ARTICLE_TAGS',
    payload: text
  }
}
const updateResponseStatus = (resStatus)=>{
  return{
    type: 'UPDATE_RESPONSE_STATUS',
    payload: resStatus
  }
}
const clearInputsNewArticle = () =>{
  return{
    type: 'CLEAR_INPUTS_NEW_ARTICLE'
  }
}
const setArticleOnPage = (article) =>{
  return{
    type: 'SET_ARTICLE_ON_PAGE',
    payload: article
  }
}


export {
  articlesLoaded,
  userActivited,
  viewArticleForTag,
  onLoading,
  updateArticleLike,
  updateTab,
  setCommentsArticle,
  hideLoading,
  setTextarea,
  deleteTextarea,
  viewArticlesInProfile,
  setNewArticleBody,
  setNewArticleDescription,
  setNewArticleTags,
  setNewArticleTitle,
  updateResponseStatus,
  clearInputsNewArticle,
  setArticleOnPage
  
}