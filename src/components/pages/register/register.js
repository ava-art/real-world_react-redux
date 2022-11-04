import React, {Fragment, Component} from "react"
import {connect} from "react-redux"
import {Link, Navigate} from "react-router-dom"
import './register.css'
import { userActivited } from "../../../action/actions"

class Register extends Component {

    state = {
        labelName: '',
        labelEmail: '',
        labelPassword: '',
        errorMessage: ''
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {labelName: username, labelEmail: email, labelPassword: password} = this.state

        const user = {
            username,
            email,
            password
        }

        try {
            const data = await this.fetchData(user)

            localStorage.setItem('jwt', JSON.stringify(data.user.token))

            this.props.userActivited(data)
        } catch (error) {
                this.setState({classErrorEmail: 'Такое имя или Email уже существуют'})
        }
    }

    fetchData = async function(user) {
        const reqData = {user}
        const request = JSON.stringify(reqData)
        const response = await fetch('https://api.realworld.io/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            body: request
        })
        const resData = await response.json()

        return resData
    }

    onNameChange = (e) => {
        this.setState({
            labelName: e.target.value
        })
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

    render() {

        const {errorMessage} = this.state
        

        if (this.props.loginIn) {
            return <Navigate to="/" replace={true} />
        }

        return (
            <Fragment>

                <div className="auth-page">
                    <div className="container page">
                        <div className="row">

                            <div className="col-md-6 offset-md-3 col-xs-12">
                                <h1 className="text-xs-center">Sign up</h1>
                                <p className="text-xs-center">
                                    <Link to="/login">Есть аккаунт?</Link>
                                </p>

                                <ul className="error-messages">
                                    <li>{errorMessage}</li>
                                </ul>

                                <form onSubmit={this.handleSubmit}>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg"
                                               type="text"
                                               placeholder="Your Name"
                                               name="username"
                                               onChange={this.onNameChange}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg"
                                               type="text"
                                               name="email"
                                               value={this.labelEmail}
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
                                        Sign up
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

const mapStateToProps = ({user, loginIn}) => {
    return {
        user,
        loginIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userActivited: (user) => dispatch(userActivited(user))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Register)