import React from "react";
import Spinner from "../../spinner/spinner";

export const EditorArticleComponent = ({ loading, valueTitle, valueDescription, valueBody, valueTags, resStatus, 
            putArticle, onChangeTitle, onChangeDescription, onChangeBody, onChangeTags }) => {
    

if (loading){
  return(
    <Spinner />
  )
}

  return (

    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {(resStatus === 200)
              ? <div className="apply-article">Сатья изменена</div>
              : <div ></div>}

            <form onSubmit={putArticle}>
              <fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Заголовок"
                    onChange={onChangeTitle} 
                    value={valueTitle}/>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="О чем статья?"
                    onChange={onChangeDescription}
                    value={valueDescription} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control" rows="8" placeholder="Текст статьи"
                    onChange={onChangeBody}
                    value={valueBody}>
                  </textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="Теги статьи"
                    onChange={onChangeTags} 
                    />
                  <div className="tag-list">
                    {(valueTags) 
                    ? valueTags.map((el,id) => {
                      return(
                        <span key={el[id]} className="tag-default tag-pill">
                          {el}
                        </span>
                      )
                    })
                    : <div></div>
                  }
                  </div>
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