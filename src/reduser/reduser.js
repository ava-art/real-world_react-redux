

const initialState = {
  articlesList: [],
  loading: true,
  user: [],
  loginIn: false,
  tag: ''
}

const reduser = (state= initialState, action)=>{
  switch(action.type){
    case 'ARTICLES_LOADED':
     return{
      ...state,
      articlesList: action.payload,
      loading: false
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
            debugger
            el.likes = newArticle.likes
            el.following = newArticle.following
            console.log();
          }
          return el
        })

        return{
          ...state,
          articlesList: newItem
        }

        default:
          return state
        }
      }
      
export default reduser

