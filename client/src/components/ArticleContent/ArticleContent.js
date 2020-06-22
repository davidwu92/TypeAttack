import React, {useState, useEffect} from 'react'
import './ArticleContent.css'

const ArticleContent = ({articleString, typedWords}) => {
  
  const articleFunction = () => <>
  {
    articleString.replace(/↵/g, "↵ ").split(" ").map((word, index, array)=>(
      word[word.length-1]==="↵"? //if the word ends with Return symbol...
      <>{
        index<typedWords.length-1 ? 
        <><span className="grey-text">{word}</span><br/></> //word.slice(0,-1) turns off Return symbols.
        :
        <>
          {/* <span className={index==typedWords.length-1?"green-text":""}>{word}</span><br/> */}
          {index===typedWords.length-1 ?
          <>
            <span className="green-text">{word}</span><div style={{display:"inline"}} id="articleScrollPoint"/><br/>
          </>
          :<>
            <span>{word}</span><br/>
          </>}
        </>
        }
      </>
      :<>
        {
        index<typedWords.length-1 ? //if there's no return symbol.
        <><span className="grey-text">{word}{" "}</span></>
        :
        <>
          {/* <span className={index===typedWords.length-1 ? "green-text":""}>{word}{" "}</span> */}
          {index===typedWords.length-1 ? 
          <>
            <span className="green-text">{word}{" "}</span><div style={{display:"inline"}} id="articleScrollPoint"/>
          </>
          :
          <>
            <span>{word}{" "}</span>
          </>}
        </>
        }
      </>
    ))
  }
  </>

  const scrollArticle = ()=>{
    if(document.getElementById("articleScrollPoint")){
      document.getElementById("articleScrollPoint").scrollIntoView({behavior:"smooth", block:"center"})
    }
  }
  useEffect(scrollArticle, [typedWords])

  return(
    <div id="testStoryArea" style={{overflowY: "scroll", height:"25vh", lineHeight:"1.7"}}>
      {typedWords.length ? null:<div style={{display:"inline"}} id="articleScrollPoint"/>}
      {articleFunction()}
    </div>
  )
}

export default ArticleContent