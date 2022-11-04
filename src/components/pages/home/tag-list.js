import React from "react";

const TagList = ({taglist}) =>{

  if(!taglist){
    return
  } else{
    return(
    <ul className="tag-list">
    {taglist.map((tag) => 
    {
      return(
       <li className="tag-default tag-pill tag-outline" key={tag}>
        {tag}
      </li> 
      )
    }
    )}
  </ul>
  )
  }
}

export default TagList