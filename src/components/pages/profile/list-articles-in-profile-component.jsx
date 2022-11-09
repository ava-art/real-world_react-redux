import React from "react"
import { Link } from "react-router-dom";

export const ListArticlesInProfileComponent = ({articlesList, tabProfile, onTabFavoritArticles, onTabMyArticles, onFavorit}) =>{
  
  const handlerFavorit = (slug) => onFavorit(articlesList, slug)

  return(
    <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button className={`nav-link ${(tabProfile === 'my') ? 'active' : ' '}`} 
                          onClick={onTabMyArticles}
                  >My Articles</button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${(tabProfile === 'favorit') ? 'active' : ''}`}
                          onClick={onTabFavoritArticles}
                  >Favorited Articles</button>
                </li>
              </ul>
            </div>

            {(articlesList.length === 0 || articlesList === {})
              ? <div className="article-preview"> Записей пока нет </div>
              : articlesList.map(({ username, img, likes, favorit, description, slug, title, createdAt }) => {
    
                return (
                  <div className="article-preview" key={slug}>
                    <div className="article-meta">
                      <Link to={`/@${username}`} ><img src={`${img}`} /></Link>
                      <div className="info">
                        <Link to={`/@${username}`}  className="author">{username}</Link>
                        <span className="date">{new Date(createdAt).toDateString()}</span>
                      </div>
                      <button className={`btn btn-outline-primary btn-sm pull-xs-right 
                                          ${(favorit) ? 'like-active' : ''}`}
                              onClick={() =>handlerFavorit(slug)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 512 512"><path fill="green" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
                        {likes}
                      </button>
                    </div>
                    <Link to={`/articles/${slug}`} className="preview-link">
                      <h1>{title}</h1>
                      <p>{description}</p>
                      <span>Read more...</span>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
  )
}
