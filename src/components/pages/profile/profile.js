import React, {Component} from "react";
import { connect } from "react-redux";
import BlogServicesApi from "../../../services/blog-services";
import { userActivited } from "../../../action/actions";
import ListArticlesInProfile from "./list-articles-in-profile";

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

    <ListArticlesInProfile user={username} />

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