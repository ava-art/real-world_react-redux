import React from "react";

export const CommentFormComponent = ({ text, userImg, onChangeText, commentPost }) => {

  return (
    <form onSubmit={commentPost} className="card comment-form">
      <div className="card-block">
        <textarea className="form-control"
          placeholder="Напишите комментарий ..."
          rows="3"
          value={text}
          onChange={onChangeText}>
        </textarea>
      </div>
      <div className="card-footer">
        <img src={userImg} className="comment-author-img" />
        <button className="btn btn-sm btn-primary" type="submit">
          Отправить комментарий
        </button>
      </div>
    </form>
  )
}