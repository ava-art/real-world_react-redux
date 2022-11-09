import { React, Component } from "react";
import { connect } from "react-redux";

import Spinner from "../../spinner/spinner";
import withBlogServices from '../../hoc/withBlogServices';

import { thunkGetListArticles } from "../../../thunks/thunkGetListArticles";
import { thunkPostFavoritArticle } from "../../../thunks/thunkPostFavoritArticle";
import { ListArticlesComponent } from "./list-articles-component";


class ArticlesListGlobal extends Component {

  componentDidMount() {

    this.props.thunkGetListArticles()
  }

  onFavorit = (articlesList, slug) => {

    this.props.thunkPostFavoritArticle(articlesList, slug)
  }

  render() {

    const { articlesList, loading } = this.props

    let classFavorit = ''
    if (articlesList && articlesList.favorit) {
      classFavorit = 'favorit-active'
    }

    if (loading) {
      return (
        <Spinner />
      )
    }

    return (
      <ListArticlesComponent
        articlesList={articlesList}
        onFavorit={this.onFavorit} />
    )
  }
}

const mapStateToProps = ({ articlesList, loading }) => {
  return {
    articlesList,
    loading
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    thunkGetListArticles: () => dispatch(thunkGetListArticles()),
    thunkPostFavoritArticle: (articlesList, slug) => dispatch(thunkPostFavoritArticle(articlesList, slug))
  }
}

export default withBlogServices()(connect(mapStateToProps, mapDispatchToProps)(ArticlesListGlobal))