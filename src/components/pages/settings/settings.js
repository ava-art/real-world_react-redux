import React, {Component} from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import BlogServicesApi from "../../../services/blog-services";
import './settings.css'

class Settings extends Component {
  

  state={
    labelEmail: '',
    labelPassword: '',
    labelUsername: '',
    labelBio: '',
    labelImage: ''
  }

  componentDidMount(){
    const blogService = new BlogServicesApi()
    
    blogService.fetchDataUser()
      .then((data) =>{
        const {email, username, bio, image} = data.user

        this.setState({
          labelEmail: email,
          labelUsername: username,
          labelBio: (!bio) ? '' : bio,
          labelImage: image,
          
        })
      })
  }

  handleSubmit = async (event) => {
    const blogService = new BlogServicesApi()
    event.preventDefault();
    const {labelName, labelEmail, labelPassword, labelBio, labelImage} = this.state

    const user = {
        username: labelName,
        email: labelEmail,
        password: labelPassword,
        bio: labelBio,
        image:labelImage,
        update: ''
    }

    try {
        const data = await blogService.fetchDataUserUpdate(user)
        localStorage.setItem('jwt', JSON.stringify(data.user.token))
        this.props.userActivited(data)
        this.setState({
          update: 'Данные обновлены'
        })

    } catch (error) {
            this.setState({update: 'Какая-то ошибка, при изменении данных'})
            
    }

    
}
  
  render() {

  const onEmailChange = (e) => {
      this.setState({labelEmail : e.target.value})
  }
  const onPasswordChange = (e) => {
    this.setState({labelPassword : e.target.value})
  }
  const onUsernameChange = (e) => {
    this.setState({labelUsername : e.target.value})
}
const onBioChange = (e) => {
  this.setState({labelBio : e.target.value})
}
const onImageChange = (e) => {
  this.setState({labelImage : e.target.value})
}



  return(
    
          <div className="settings-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Настройки</h1>
                        <ul className="update-settings">
                                    <li>{this.state.update}</li>
                                </ul>
                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control" type="text" placeholder="URL of profile picture"
                                          onChange={onImageChange} 
                                          value={this.state.labelImage} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" 
                                            onChange={onUsernameChange}
                                            type="text" placeholder="Your Name"
                                             value={this.state.labelUsername} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea className="form-control form-control-lg" rows="8"
                                              onChange={onBioChange}
                                              placeholder="Short bio about you" 
                                              value={this.state.labelBio}></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" 
                                            onChange={onEmailChange}
                                            value={this.state.labelEmail}
                                            type="text" placeholder="Email" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg"
                                            onChange={onPasswordChange}
                                            type="password" 
                                            value={this.state.labelPassword}
                                            placeholder="Password"  />
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                                    Обновить профиль
                                </button>
                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
          </div>
  )
}
  }


const mapStateToProps = ({user, loading}) =>{
  return{
    user,
    loading

  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    userActivited: (user) =>{
      dispatch({
        type: 'USER_ACTIVITED',
        payload: user
      })
  }
}
}


export default connect(mapStateToProps,mapDispatchToProps)(Settings)