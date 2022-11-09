import React, { Component } from "react";
import { connect } from "react-redux";
import { setNewArticleBody, setNewArticleDescription, setNewArticleTags, setNewArticleTitle } from '../../../action/actions'
import { thunkPutArticle } from "../../../thunks/thunkPutArticle";
import { updateResponseStatus, clearInputsNewArticle } from "../../../action/actions";
// import './new-article.css'
import { EditorArticleComponent } from "./editor-article-component";
import { thunkGetArticle } from "../../../thunks/thunkGetArticle";

class EditorArticle extends Component {

  componentDidMount() {

    this.props.thunkGetArticle()
  }
  componentDidUpdate() {
    const {title, description, body, tagList} = this.props.article.article
    if (title && this.props.title === '') {
      this.props.setNewArticleTitle(title)
    }
    if (description && this.props.description === '') {
      this.props.setNewArticleDescription(description)
    }
    if (body && this.props.body === '') {
      this.props.setNewArticleBody(body)
    }
    if (tagList && this.props.tags === '') {
      this.props.setNewArticleTags(tagList)
    }
  }
  componentWillUnmount() {
    this.props.updateResponseStatus(0)
  }

  putArticle = async (e) => {
    e.preventDefault()
    const {slug} = this.props.article.article
    const { title, body, description, tags } = this.props
    if (title !== '' || body !== '' || description !== '' || tags !== '') {

      const bodyArticle = {
        article: {
          title,
          description,
          body
        }
      }

      this.props.thunkPutArticle(bodyArticle, slug)

    }
  }


  onChangeTitle = (e) => {
    this.props.setNewArticleTitle(e.target.value)
  }
  onChangeDescription = (e) => {
    this.props.setNewArticleDescription(e.target.value)
  }
  onChangeBody = (e) => {
    this.props.setNewArticleBody(e.target.value)
  }
  onChangeTags = (e) => {
    this.props.setNewArticleTags(e.target.value)
  }



  render() {

    const { body, title, description, tags, resStatus, loading } = this.props

    return (
      < EditorArticleComponent
        resStatus={resStatus}
        putArticle={this.putArticle}
        onChangeTitle={this.onChangeTitle}
        onChangeDescription={this.onChangeDescription}
        onChangeBody={this.onChangeBody}
        onChangeTags={this.onChangeTags}
        valueTitle={title}
        valueDescription={description}
        valueBody={body}
        valueTags={tags}
        loading={loading}
      />
    )
  }
}

const mapState = ({ body, title, description, tags, resStatus, loading, article }) => {
  return {
    body, title, description, tags, resStatus, loading, article
  }
}
const mapDispatch = (dispatch) => {
  return {
    setNewArticleTitle: (text) => dispatch(setNewArticleTitle(text)),
    setNewArticleDescription: (text) => dispatch(setNewArticleDescription(text)),
    setNewArticleBody: (text) => dispatch(setNewArticleBody(text)),
    setNewArticleTags: (text) => dispatch(setNewArticleTags(text)),
    updateResponseStatus: (resStatus) => dispatch(updateResponseStatus(resStatus)),
    thunkPutArticle: (bodyArticle, slug) => dispatch(thunkPutArticle(bodyArticle, slug)),
    clearInputsNewArticle: () => dispatch(clearInputsNewArticle()),
    thunkGetArticle: () => dispatch(thunkGetArticle())
  }
}

export default connect(mapState, mapDispatch)(EditorArticle)