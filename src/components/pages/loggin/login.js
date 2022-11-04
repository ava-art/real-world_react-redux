import React, { Fragment, Component } from "react"
import { connect } from "react-redux"
import { userActivited } from "../../../action/actions"
import BlogServicesApi from "../../../services/blog-services"
import { Link,Navigate  } from "react-router-dom"



class Login extends Component {

    blogServicesApi = new BlogServicesApi()

    state = {
        labelEmail: '',
        labelPassword: '',
        errorMessage: ''
    }
    onEmailChange = (e) => {
        this.setState({
            labelEmail: e.target.value
        })
    }
    onPasswordChange = (e) => {
        this.setState({
            labelPassword: e.target.value
        })
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        const {labelEmail: email, labelPassword: password} = this.state

        const user = {
            email,
            password
        }

        try {
            const data = await this.blogServicesApi.fetchDataLogin(user)
debugger
            localStorage.setItem('jwt', JSON.stringify(data.user.token))

            this.props.userActivited(data)
        } catch (error) {
                this.setState({errorMessage: 'Такого имени или пароля не существует'})
        }
    }



   
render(){

    if (this.props.loginIn) {
        return <Navigate to="/" replace={true} />
    }
            
                return(
    <Fragment>

<div className="auth-page">
    <div className="container page">
        <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign in</h1>
                    <p className="text-xs-center">
                        <Link to="/register">Нет аккаунта?</Link>
                    </p>
                    <ul className="error-messages">
                        <li>{this.state.errorMessage}</li>
                    </ul>
                <form onSubmit={this.handleSubmit}>
                    <fieldset className="form-group">
                        <input className="form-control form-control-lg"
                                type="text" 
                                name="email"
                                placeholder="Email"
                                onChange={this.onEmailChange}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <input className="form-control form-control-lg"
                                 type="password" 
                                 name="password"
                                 placeholder="Password" 
                                 onChange={this.onPasswordChange}/>
                    </fieldset>
                    <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                        Sign in
                    </button>
                </form>
            </div>

        </div>
    </div>
</div>

    </Fragment>
  )
 }
}

  

const mapStateToProps = ({user, loginIn}) =>{
    return{
        user,
        loginIn
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        userActivited: (user) => dispatch(userActivited(user))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Login)