import React, {Component} from "react";
import { connect } from "react-redux";
import BlogServicesApi from "../../../services/blog-services";
import { userActivited } from "../../../action/actions";

class Profile extends Component{

  state ={
    bio: "",
    following: null,
    image: "",
    username: "",
  }

  blogServicesApi = new BlogServicesApi()

  componentDidMount(){
const url = String(window.location) 
    const newStr = url.substring(url.lastIndexOf('@') + 1);
          this.blogServicesApi.getUserProfile(newStr)
              .then((data) => data.json())
              .then(({profile}) => {
                console.log(profile)
                const {bio, following, image, username} = profile
                this.setState({
                  bio,
                  following,
                  image,
                  username,
          })
       })
   }

   onFolower = () =>{
      const url = String(window.location) 
      const newStr = url.substring(url.lastIndexOf('@') + 1);
        if(!this.state.following){
          this.blogServicesApi.onFollowUser(newStr, 'POST')
          this.setState({following: true})
      } else{
        this.blogServicesApi.onFollowUser(newStr, 'DELETE')
        this.setState({following: false})
      }

  
   }

  render(){
        
    
        const {bio, following, image, username} = this.state

    return(
      <div className="profile-page">

    <div className="user-info">
        <div className="container">
            <div className="row">

                <div className="col-xs-12 col-md-10 offset-md-1">
                    <img src={image} className="user-img"/>
                    <h4>{username}</h4>
                    <p>
                        {bio}
                    </p>
                    <button className="btn btn-sm btn-outline-secondary action-btn"
                        onClick={this.onFolower}>
                        <i className="ion-plus-round"></i>
                        &nbsp;
                        {(following === true) ? `Отписаться от ${username}` : `Подписаться на ${username}` }
                    </button>
                </div>

            </div>
        </div>
    </div>

    <div className="container">
        <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                    <ul className="nav nav-pills outline-active">
                        <li className="nav-item">
                            <a className="nav-link active" href="">My Articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">Favorited Articles</a>
                        </li>
                    </ul>
                </div>

                <div className="article-preview">
                    <div className="article-meta">
                        <a href=""><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
                        <div className="info">
                            <a href="" className="author">Eric Simons</a>
                            <span className="date">January 20th</span>
                        </div>
                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                            <i className="ion-heart"></i> 29
                        </button>
                    </div>
                    <a href="" className="preview-link">
                        <h1>How to build webapps that scale</h1>
                        <p>This is the description for the post.</p>
                        <span>Read more...</span>
                    </a>
                </div>

                <div className="article-preview">
                    <div className="article-meta">
                        <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg"/></a>
                        <div className="info">
                            <a href="" className="author">Albert Pai</a>
                            <span className="date">January 20th</span>
                        </div>
                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                            <i className="ion-heart"></i> 32
                        </button>
                    </div>
                    <a href="" className="preview-link">
                        <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                        <p>This is the description for the post.</p>
                        <span>Read more...</span>
                        <ul className="tag-list">
                            <li className="tag-default tag-pill tag-outline">Music</li>
                            <li className="tag-default tag-pill tag-outline">Song</li>
                        </ul>
                    </a>
                </div>


            </div>

        </div>
    </div>

</div>
    )
  }
}

const mapStateToProps = ({user}) =>{
  return{
    user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      userActivited: (user) => dispatch(userActivited(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)