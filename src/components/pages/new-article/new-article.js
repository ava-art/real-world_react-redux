import React, { Component } from "react";
import { connect } from "react-redux";
import { NewArticleComponent } from "./new-article-component";
import { setNewArticleBody, setNewArticleDescription, setNewArticleTags, setNewArticleTitle } from '../../../action/actions'
import { thunkPostNewArticle } from "../../../thunks/thunkPostNewArticle";
import { updateResponseStatus, clearInputsNewArticle } from "../../../action/actions";
import './new-article.css'


class NewArticle extends Component {

  componentDidMount() {
    this.props.updateResponseStatus(0)
  }
  componentWillUnmount() {
    this.props.updateResponseStatus(0)
  }

  postArticle = async (e) => {
    e.preventDefault()

    const { title, body, description, tags } = this.props
    if (title !== '' || body !== '' || description !== '' || tags !== '') {
      
      const bodyArticle = {
        article: {
          title,
          description,
          body,
          tagList: [tags]
        }
      }
      
      this.props.thunkPostNewArticle(bodyArticle)

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

    const { resStatus } = this.props

    return (
      < NewArticleComponent
        resStatus={resStatus}
        postArticle={this.postArticle}
        onChangeTitle={this.onChangeTitle}
        onChangeDescription={this.onChangeDescription}
        onChangeBody={this.onChangeBody}
        onChangeTags={this.onChangeTags}

      />
    )
  }
}

const mapState = ({ body, title, description, tags, resStatus, loading }) => {
  return {
    body, title, description, tags, resStatus, loading
  }
}
const mapDispatch = (dispatch) => {
  return {
    setNewArticleTitle: (text) => dispatch(setNewArticleTitle(text)),
    setNewArticleDescription: (text) => dispatch(setNewArticleDescription(text)),
    setNewArticleBody: (text) => dispatch(setNewArticleBody(text)),
    setNewArticleTags: (text) => dispatch(setNewArticleTags(text)),
    updateResponseStatus: (resStatus) => dispatch(updateResponseStatus(resStatus)),
    thunkPostNewArticle: (bodyArticle) => dispatch(thunkPostNewArticle(bodyArticle)),
    clearInputsNewArticle: () => dispatch(clearInputsNewArticle())
  }
}

export default connect(mapState, mapDispatch)(NewArticle)