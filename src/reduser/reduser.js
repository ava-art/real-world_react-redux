

const initialState = {
  articlesList: [],
  loading: true,
  user: [],
  loginIn: false,
  tag: '',
  tab: 'global',
}

const reduser = (state= initialState, action)=>{
  switch(action.type){
    case 'ARTICLES_LOADED':
     return{
      ...state,
      articlesList: action.payload,
      loading: false,
     }
     case 'USER_ACTIVITED':
     return{
      ...state,
      user: action.payload,
      loginIn: true
     }
     case 'VIEW_ARTICLE_FOR_TAG':
      return{
        ...state,
        articlesList: action.payload,
        loading: false
      }
      case 'ON_LOADING':
        return{
          ...state,
          loading: true
        }
      case 'UPDATE_ARTICLE_LIKE':
          const {articlesList} = state
          const newArticle = action.payload
          console.log(action.payload);
         
        const newItem = articlesList.map(el => {
          if ( el.slug === newArticle.slug){
            el.favorit = newArticle.favorit
            el.likes = newArticle.likes
            el.following = newArticle.following
            
          }
          return el
        })
        return{
          ...state,
          articlesList: newItem
        }

        case 'UPDATE_TAB':
          return{
            ...state,
            articlesList: action.payload,
            loading: false,
            tag: action.tag,
            tab: action.tab,
          }

        default:
          return state
        }
      }
      
export default reduser

