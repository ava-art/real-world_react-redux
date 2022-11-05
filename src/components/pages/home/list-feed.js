import {React, Fragment} from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { updateTab, onLoading } from "../../../action/actions";
import ArticlesStoreServices from "../../../services/articles-store-services";

const ListFeed = ({loginIn, tag, tab, updateTab, onLoading}) =>{

  const articlesStoreServices = new ArticlesStoreServices()

  const getTabYour = () =>{
    onLoading()
    articlesStoreServices.getArticlesFeed()
      .then(data =>{
        return(
          updateTab(data,'your','ddd')
        )
      })
  }
    const getTabGlobal = () =>{
      onLoading()
    articlesStoreServices.getArticles()
      .then(data =>{
        return(
          updateTab(data,'global','')
        )
      })
    }

  if (loginIn){
    return(
      <Fragment>
              <li className="nav-item" 
                  onClick={() => getTabYour()}>
                  <Link to="" className={`nav-link ${(tab === 'your') ? 'active' : ''}`}>Your Feed</Link>
              </li>
              <li className="nav-item" 
                  onClick={() => getTabGlobal()}>
                  <Link to="" className={`nav-link ${(tab === 'global') ? 'active' : ''}`}>Global Feed</Link>
              </li>
              <li className={`nav-item ${(tab === 'tag' ? 'nav-list_tag-active' : 'nav-list_tag' )}`}>
                <span className="nav-link active">
                  {`#${tag}`}
                </span>
              </li>
    </Fragment>
    )
  } else{
    return(
      <Fragment>
        <li className="nav-item">
          <Link to="" className="nav-link">Global Feed</Link>
        </li>
        <li className={`nav-item ${(tag !== '' ?'nav-list_tag-active' : 'nav-list_tag' )}`}>
            <span className="nav-link">{`#${tag}`}</span>
        </li>
      </Fragment>
    
  )
  }

  
}

const mapStateToProps = ({articlesList,loginIn, tag, tab}) =>{
  return{
    articlesList,
    loginIn,
    tag,
    tab
  }
}
const mapDispatchToProps= (dispatch) =>{
  return{
    onLoading: () => dispatch(onLoading()),
    updateTab: (newArticle,tab, tag) => dispatch(updateTab(newArticle,tab, tag))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListFeed)
