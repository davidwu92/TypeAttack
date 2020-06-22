import React, {useState, useEffect, useRef} from 'react'
import './TypingArea.css'

const TypingArea = ({typedWords, setTypedWords, articleString}) => {

  const handleKeyDown = (e) =>{//this function will handle special key presses in the typing area.
    if (e.keyCode === 8){
      // console.log("You pressed Backspace.")
      if (typedWords[0]){
        // setBackspaceCount(backspaceCount=>backspaceCount+1)
        let newArray = typedWords
        if(typedWords[typedWords.length-1]===""){ //if the last thing typed was space/enter...
          let previousWord = newArray[newArray.length-2].length>1 ? 
            newArray[newArray.length-2].slice(0, -1):""
          newArray.splice(-2,2, previousWord)
          setTypedWords(JSON.parse(JSON.stringify(newArray)))
          document.getElementById("typedString").innerHTML = null
        } else { //if the last thing typed was a character...
          let previousWord = newArray[newArray.length-1].length>1 ? 
            newArray[newArray.length-1].slice(0, -1):""
          newArray.splice(-1, 1, previousWord)
          setTypedWords(JSON.parse(JSON.stringify(newArray)))
          document.getElementById("typedString").innerHTML = null
        }
      }
      // console.log("HandleKeyDown: TYPED WORDS:")
      // console.log(typedWords)
    }
    if (e.keyCode === 9){e.preventDefault()} //pressed Tab.
    // if (e.keyCode === 13){console.log("You pressed Enter.")}
    // if (e.keyCode === 16){console.log("You pressed Shift.")}
    // if (e.keyCode === 17){console.log("You pressed Control.")}
    if (e.keyCode === 18){e.preventDefault()}
    // if(e.keyCode === 32){console.log("You pressed Space.")}
  }
  
  const handleKeyPress = (e) => {//this function will handle any non-special key presses. Gives charCodes.
    // console.log("character code: ")
    // console.log(e.charCode)
    // console.log(e.key)
    if(!typedWords.length){ //if typedWords is empty...
      //only set typedWords if the first key is nonspace, nonenter.
      if(e.charCode!==32 && e.charCode!==13){
        e.preventDefault()
        setTypedWords([e.key])
        document.getElementById("typedString").innerHTML = null
      }
    } else { //typedWords isn't empty
      let newArray = typedWords
      if(e.charCode ===32){ //when Space is pressed...
        e.preventDefault()
        //add " " to last element...
        newArray[newArray.length-1] = newArray[newArray.length-1] + " "
        // if(newArray[newArray.length-1]!=articleString.replace(/↵/g, "↵ ").split(" ")[newArray.length-1]+" "){
        //   setTotalMistakes(totalMistakes=>totalMistakes+1)
        //   console.log("mistakes:" + totalMistakes)
        // }
        newArray[newArray.length] = ""
        setTypedWords(JSON.parse(JSON.stringify(newArray)))
        document.getElementById("typedString").innerHTML = null
      } else if (e.charCode === 13){ //when Enter is pressed...
        e.preventDefault()
        //add "↵" to last element...
        newArray[newArray.length-1] = newArray[newArray.length-1] + "↵"
        // if(newArray[newArray.length-1]!=articleString.replace(/↵/g, "↵ ").split(" ")[newArray.length-1]){
        //   setTotalMistakes(totalMistakes=>totalMistakes+1)
        //   console.log("mistakes:" + totalMistakes)
        // }
        newArray[newArray.length] = ""
        setTypedWords(JSON.parse(JSON.stringify(newArray)))
        document.getElementById("typedString").innerHTML = null
        //check if you're at the end of the article.
        if (typedWords.length === articleString.replace(/↵/g, "↵ ").split(" ").length){
          console.log("Finished test")
          // endTest()
        }
      } else { //non-Space, non-Enter character registered.
        e.preventDefault()
        newArray[newArray.length-1] = newArray[newArray.length-1] + e.key
        setTypedWords(JSON.parse(JSON.stringify(newArray)))
        document.getElementById("typedString").innerHTML = null
      }
      // console.log("HandlekeyPress: TYPED WORDS: ")
      // console.log(typedWords)
    }
  }

  const typedFunction = () => <>
    {typedWords.length ? typedWords.map((word, index, array)=>(
      word[word.length-1]!=="↵" ? 
          articleString.replace(/↵/g, "↵ ").split(" ")[index]!==word.slice(0,-1) && index<array.length-1 ?
            <><span className="red-text" data-mistake="mistake"><u>{word.slice(0,-1)}</u>{" "}</span></>
            :<span data-correct="correct">{word}</span>
        : articleString.replace(/↵/g, "↵ ").split(" ")[index]!==word && index<array.length-1 ?
          <><span className="red-text" data-mistake="mistake"><u>{word}</u></span><br/></>
          :<><span data-correct="correct">{word}</span><br/></>
    )):null}
  </>
  //Scroll To Bottom of typing area.
  const typeAreaRef = useRef(null)
  const scrollToBottom = () => {
    typeAreaRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [typedWords])
  
  return(
    <div className="blue lighten-4" style={{width:"100%", border:"black", maxHeight: "6em",
          borderStyle:"solid", borderWidth:"1px", margin:"5px 0px 0px 0px", overflowY:"scroll"}}>
        {/* Previously-typed words appear here. */}
        <div id="typedWordsDiv" style={{display:"inline"}}>{typedFunction()}</div>

        {/* editable typing area: 1 character at a time. */}
        <div style={ typedWords[0]?
              {textIndent:"4px", display: "inline-block", backgroundColor:"antiquewhite", margin:"none", 
                border:"none", width:"5px"}
              :{textIndent:"4px", display: "inline-block", backgroundColor:"antiquewhite", margin:"0", 
                    border:"none", width:"inherit", color:"grey"}
            }
          id="typedString" name="typedString" contentEditable 
          //add a timer, disable these functions when time runs out.
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}>
            {typedWords[0]?null:"Start typing here to begin the test."}
        </div>
        
        {/* dummy component for scrolling to bottom */}
        <div ref={typeAreaRef}/>
    </div>
  )
}

export default TypingArea