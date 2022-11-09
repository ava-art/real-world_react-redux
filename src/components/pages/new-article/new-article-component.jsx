import React from "react";

export const NewArticleComponent = ({ resStatus, postArticle, onChangeTitle, onChangeDescription,
  onChangeBody, onChangeTags }) => {

  return (

    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {(resStatus === 200)
              ? <div className="apply-article">Сатья опубликована!</div>
              : <div ></div>}

            <form onSubmit={postArticle}>
              <fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Заголовок"
                    onChange={onChangeTitle} />
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="О чем статья?"
                    onChange={onChangeDescription} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control" rows="8" placeholder="Текст статьи"
                    onChange={onChangeBody}>
                  </textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="Теги статьи"
                    onChange={onChangeTags} />
                  <div className="tag-list"></div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                  Опубликовать статью
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}