

const initialState = {
  articlesList: [],
  loading: true,
  resStatus: '',

  article: '',

  user: [],
  loginIn: false,

  tag: '',
  tab: 'global',

  comments: [],
  valueTextarea: '',
  tabProfile: 'my',

  title: '',
  description: '',
  body: '',
  tags: ''

}

const updateNewArticle = (state, action) => {

  switch (action.type) {
    case 'SET_NEW_ARTICLE_TITLE':
      return {
        ...state,
        title: action.payload
      }
    case 'SET_NEW_ARTICLE_DESCRIPTION':
      return {
        ...state,
        description: action.payload
      }
    case 'SET_NEW_ARTICLE_TAGS':
      return {
        ...state,
        tags: action.payload
      }
    case 'SET_NEW_ARTICLE_BODY':
      return {
        ...state,
        body: action.payload
      }
  }
}

const reduser = (state = initialState, action) => {
  switch (action.type) {
    case 'ARTICLES_LOADED':
      return {
        ...state,
        articlesList: action.payload,
        loading: false,
      }
    case 'USER_ACTIVITED':
      return {
        ...state,
        user: action.payload,
        loginIn: true
      }
    case 'VIEW_ARTICLE_FOR_TAG':
      return {
        ...state,
        articlesList: action.payload,
        loading: false
      }
    case 'ON_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'HIDE_LOADING':
      return {
        ...state,
        loading: false
      }
    case 'UPDATE_ARTICLE_LIKE':
      const { articlesList } = state
      const newArticle = action.payload


      const newItem = articlesList.map(el => {
        if (el.slug === newArticle.slug) {
          el.favorit = newArticle.favorit
          el.likes = newArticle.likes
          el.following = newArticle.following

        }
        return el
      })
      return {
        ...state,
        articlesList: newItem
      }

    case 'UPDATE_TAB':
      return {
        ...state,
        articlesList: action.payload,
        loading: false,
        tag: action.tag,
        tab: action.tab,
      }

    case 'SET_COMMENTS_ARTICLE':
      return {
        ...state,
        comments: action.payload
      }

    case 'SET_TEAXTAREA':
      return {
        ...state,
        valueTextarea: action.payload
      }
    case 'DELETE_TEXTAREA':
      return {
        ...state,
        valueTextarea: ''
      }
    case 'VIEW_ARTICLES_IN_PROFILE':
      return {
        ...state,
        articlesList: action.payload,
        tabProfile: action.tabName
      }
    case 'SET_NEW_ARTICLE_TITLE':
      return {
        ...state,
        title: action.payload
      }
    case 'SET_NEW_ARTICLE_DESCRIPTION':
      return {
        ...state,
        description: action.payload
      }
    case 'SET_NEW_ARTICLE_TAGS':
      return {
        ...state,
        tags: action.payload
      }
    case 'SET_NEW_ARTICLE_BODY':
      return {
        ...state,
        body: action.payload
      }
    case 'UPDATE_RESPONSE_STATUS':
      return{
        ...state,
        resStatus: action.payload
      }
    case 'CLEAR_INPUTS_NEW_ARTICLE':
      return{
        ...state,
        body: '',
        description: '',
        title: '',
        tags: ''
      }
    case 'SET_ARTICLE_ON_PAGE':
      return{
        ...state,
        article: action.payload
      }

    default:
      return state
  }
}

export default reduser

