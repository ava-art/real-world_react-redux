import { connect } from "react-redux";
import Spinner from "../../spinner/spinner";
import { Component } from "react";
import { CommentComponent } from "./comment-component";
import { CommentFormComponent } from "./comment-form-component";
import { thunkGetComments } from "../../../thunks/thunkGetComments";
import { thunkPostComments } from "../../../thunks/thunkPostComment";
import { setTextarea } from "../../../action/actions";
import { thunkDeleteComment } from "../../../thunks/thunkDeleteComment";

class CommentsArticle extends Component {

  componentDidMount() {
    const url = String(window.location)
    const slug = url.substring(url.lastIndexOf('/') + 1);

    this.props.thunkGetComments(slug)
  }

  postComment = async (event) => {
    event.preventDefault()
    const url = String(window.location)
    const slug = url.substring(url.lastIndexOf('/') + 1);
    const { comments, valueTextarea } = this.props
    
    this.props.thunkPostComments(slug, valueTextarea, comments)
  }

  setTextArea = (e) => {
    this.props.setTextarea(e.target.value)
  }

  deleteComment = async (id) => {
    const url = String(window.location)
    const slug = url.substring(url.lastIndexOf('/') + 1);
    const {comments} = this.props

    this.props.thunkDeleteComment(id, slug, comments)

  }

  render() {

    const { user, loading, comments, valueTextarea } = this.props

    if (loading || !comments || comments === undefined) {
      return (
        <Spinner />
      )
    }

    
    return (
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">

          <CommentFormComponent
            text={valueTextarea}
            userImg={user.user.image}
            onChangeText={this.setTextArea}
            commentPost={this.postComment} />

          {comments.map(({ author, body, createdAt, id }) => {

            return (
              <CommentComponent
                key={id}
                id={id}
                body={body}
                username={author.username}
                img={author.image}
                currentUsername={user.user.username}
                createdAt={createdAt}
                deleteComent={this.deleteComment}
              />
            )
          })}

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ loading, comments, user, valueTextarea }) => {
  return {
    loading,
    comments,
    user,
    valueTextarea
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    thunkGetComments: (slug) => dispatch(thunkGetComments(slug)),
    thunkPostComments: (slug, body, commentsArray) => dispatch(thunkPostComments(slug, body, commentsArray)),
    setTextarea: (text) => dispatch(setTextarea(text)),
    thunkDeleteComment: (id, slug, comments) => dispatch(thunkDeleteComment(id, slug, comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsArticle)