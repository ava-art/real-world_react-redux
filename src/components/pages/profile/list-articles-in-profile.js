import React, { Component } from "react";
import { connect } from "react-redux";

import './profile.css'
import { ListArticlesInProfileComponent } from "./list-articles-in-profile-component";

import Spinner from "../../spinner/spinner";

import { thunkGetArticlesInProfile } from "../../../thunks/thunkGetArticlesInProfile";
import { thunkPostFavoritArticle } from "../../../thunks/thunkPostFavoritArticle";

class ListArticlesInProfile extends Component {

  componentDidMount() {

    const user = this.props.tabProfile.user
    this.props.thunkGetArticlesInProfile(user, 'author', 'my')
  }

  onTabFavoritArticles = () => {
    const user = this.props.tabProfile.user
    this.props.thunkGetArticlesInProfile(user, 'favorited', 'favorit')
  }
  onTabMyArticles = () => {
    const url = String(window.location)
    const user = url.substring(url.lastIndexOf('@') + 1);
    this.props.thunkGetArticlesInProfile(user, 'author', 'my')
  }

  onFavorit = (articlesList, slug) => {

    this.props.thunkPostFavoritArticle(articlesList, slug)
  }

  render() {

    const { loading, tabProfile, articlesList } = this.props.loading

    if (loading) {
      return (
        <Spinner />
      )
    }

    return (

      <ListArticlesInProfileComponent
        articlesList={articlesList}
        tabProfile={tabProfile}
        onTabFavoritArticles={this.onTabFavoritArticles} 
        onTabMyArticles={this.onTabMyArticles}
        onFavorit={this.onFavorit}/>

    )
  }
}

const mapState = (loading, tabProfile, user, articlesList) => {
  return {
    loading,
    tabProfile,
    user,
    articlesList
  }
}
const mapDispatch = (dispatch) => {
  return {
    thunkGetArticlesInProfile: (user, reqName, tabName) => dispatch(thunkGetArticlesInProfile(user, reqName, tabName)),
    thunkPostFavoritArticle: (articlesList, slug) => dispatch(thunkPostFavoritArticle(articlesList, slug))
  }
}

export default connect(mapState, mapDispatch)(ListArticlesInProfile)