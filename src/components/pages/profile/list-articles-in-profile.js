import React,{ Component } from "react";
import BlogServicesApi from "../../../services/blog-services";
import Spinner from "../../spinner/spinner";
import { Link } from "react-router-dom";


class ListArticlesInProfile extends Component{

  state ={
    listArticles: [],
    loading: true,
    tab: false
  }
componentDidMount(){

  const blogServicesApi = new BlogServicesApi()

  const data = blogServicesApi.getAllArticles(this.props.user, 'author')
        .then(data => {
          this.setState({
                listArticles: data,
                loading: false,
                tab:false
              })
        })

}

  render(){

const {loading, listArticles, tab} = this.state
    if (loading){
      <Spinner />
    }


    return(

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                    <ul className="nav nav-pills outline-active">
                        <li className="nav-item">
                            <Link className={`nav-link ${(!tab)? 'active' : ' ' }`} >My Articles</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${(!tab)? '' : 'active' }`}>Favorited Articles</Link>
                        </li>
                    </ul>
                </div>

            
            </div>
        </div>
    </div>
    )
  }

}


export default ListArticlesInProfile