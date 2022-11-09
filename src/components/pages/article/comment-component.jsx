import React from "react"
import { Link } from "react-router-dom";

export const CommentComponent = ({ id, body, username, img, currentUsername, createdAt, deleteComent }) => {
  const deleteHandler = () => deleteComent(id)
  const timestamp = new Date(createdAt).toDateString()

  return (
    <div className="card" key={id}>
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/@${username}`} className="comment-author">
          <img src={img} className="comment-author-img" />
        </Link>
        &nbsp;
        <Link to={`/@${username}`} className="comment-author">{username}</Link>
        {(username === currentUsername)
          ? <button className="comment-trash" onClick={deleteHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width={10} viewBox="0 0 448 512"><path fill="#919191" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
          </button>
          : null
        }
        <span className="date-posted">{timestamp}</span>
      </div>
    </div>
  )
}