import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import Spinner from "../../spinner/spinner"
import './article.css'
import CommentsArticle from "./comments-article"
import { thunkDeleteArticle } from '../../../thunks/thunkDeleteArticle'
import { thunkGetArticle } from '../../../thunks/thunkGetArticle'
import { updateResponseStatus } from '../../../action/actions'

class ArticlePage extends Component {

    componentDidMount() {
        this.props.thunkGetArticle()
    }

    componentWillUnmount() {
        this.props.updateResponseStatus(0)
    }

    deleteArticle = () => {
        const { slug } = this.props.article.article
        this.props.thunkDeleteArticle(slug)
    }

    changeArticle = () => {
        return <Navigate to="/editor/:slug" replace={true} />
    }

    render() {

        const { resStatus, article } = this.props
        const { user } = this.props.user

        if (resStatus >= 200 && resStatus < 300) {
            return <Navigate to="/" replace={true} />
        }

        if (article === '' || user === undefined) {
            return (
                <Spinner />
            )
        }
        const { author, body, slug, createdAt, title } = this.props.article.article


        return (

            <div className="article-page">

                <div className="banner">
                    <div className="container">

                        <h1>{title}</h1>

                        <div className="article-meta">
                            <Link to={`/`}><img src={author.image} /></Link>
                            <div className="info">
                                <Link to={`/@${author.username}`} className="author">{author.username}</Link>
                                <span className="date">{new Date(createdAt).toDateString()}</span>
                            </div>
                            {(author.username === user.username)
                                ? <span>
                                    <Link className="btn btn-outline-primary"
                                            to={`/editor/${slug}`} replace={true}>Редактировать</Link>
                                    <button className="btn btn-outline-danger"
                                        onClick={this.deleteArticle}>Удалить</button>
                                </span>
                                : ''
                            }
                        </div>
                    </div>
                </div>

                <div className="container page">
                    <div className="row article-content">
                        <div className="col-md-12">
                            <p>
                                {body}
                            </p>
                        </div>
                    </div>

                    <hr />

                    <CommentsArticle />

                </div>

            </div>
        )
    }
}
const mapStateToProps = ({ loading, comments, user, article, resStatus }) => {
    return {
        loading,
        comments,
        user,
        article,
        resStatus
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        thunkDeleteArticle: (slug) => dispatch(thunkDeleteArticle(slug)),
        thunkGetArticle: () => dispatch(thunkGetArticle()),
        updateResponseStatus: (resStatus) => dispatch(updateResponseStatus(resStatus))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage)
