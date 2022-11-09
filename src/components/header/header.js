import React, { Component, Fragment } from "react"
import './header.css'
import { Link } from "react-router-dom"
import { connect } from "react-redux"


const NewArticleAndSettings = ({ loginIn, user }) => {



    if (loginIn === true) {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link to="/new-article" className="nav-link">
                        New articles
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                        Settings
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/@${user?.username}`} className="nav-link">
                        <img
                            src={user.image}
                            className="user-pic"
                        />
                        {user.username}
                    </Link>
                </li>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Sign in</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Sign up</Link>
                </li>
            </Fragment>
        )
    }
}


class Header extends Component {


    render() {
        const { user } = this.props.user
        return (

            <nav className="navbar navbar-light">
                <div className="container">
                    <Link to="/" className="navbar-brand">conduit</Link>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">Home</Link>
                        </li>
                        <NewArticleAndSettings loginIn={this.props.loginIn} user={user} />

                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = ({ user, loginIn }) => {
    return {
        user,
        loginIn
    }
}

export default connect(mapStateToProps)(Header)