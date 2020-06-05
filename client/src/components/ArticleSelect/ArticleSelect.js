import React, {useState} from 'react'

const ArticleSelect = ({setArticleString, socket}) => {
  
  async function getArticle(titleArray){
    let title = "Barack_Obama"
    if(titleArray.length){
      title = titleArray[Math.floor(Math.random()*titleArray.length)]
    }
    console.log(title)
    // setTestArticle(title.split("_").join(" "))
    let url = "https://en.wikipedia.org/w/api.php"; 
    let params = {
        action: "query",
        prop:"extracts",
        exsentences:"10",
        exlimit: "1",
        titles: title,
        explaintext:"1",
        // formatversion:"2",
        format:"json",
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    console.log(url)
    const response = await fetch(url);
    const jsonRes = await response.json();
    // console.log(JSON.stringify(jsonRes));
    // console.log(jsonRes);
    // const jsonText = await response.text();
    // console.log(jsonText)
    let scrapedString = Object.values(jsonRes.query.pages)[0].extract
    let arr = scrapedString.split("\n") //replace newline char with return symbol
    let formattedEssay = arr.join("↵")
    
    //replace double spaces with single spaces.
    //Put a space in front of every period followed immediately by a letter.
    let formatString = formattedEssay.replace(/ {2}/g, " ").replace(/\.(?=[A-Za-z])/g,". ").replace(/–/g, "-") + "↵"
    console.log(formatString)

    //useEffect will setArticleString instead?
    // setArticleString(formatString)

    //emit to backend.
    socket.emit('articleSelected', formatString, ()=>{})
  }

  const selectArticle = () => {
    let titleArray = []
    switch (document.getElementById(`categorySelect`).value) {
      case `0`:
        setArticleString(``)
        break;
      case `category1`:
        titleArray = ["United_States_Bill_of_Rights", "Constitution_of_the_United_States",
        "First_Amendment_to_the_United_States_Constitution", "Second_Amendment_to_the_United_States_Constitution",
        "Third_Amendment_to_the_United_States_Constitution", "Fourth_Amendment_to_the_United_States_Constitution",
        "Fifth_Amendment_to_the_United_States_Constitution", "Sixth_Amendment_to_the_United_States_Constitution",
        "Seventh_Amendment_to_the_United_States_Constitution", "Eighth_Amendment_to_the_United_States_Constitution",
        "Ninth_Amendment_to_the_United_States_Constitution", "Tenth_Amendment_to_the_United_States_Constitution",
      ]
        break;
      case `category2`:
        titleArray = ["President_of_the_United_States", "George_Washington", "Abraham_Lincoln", "John_Adams", "Barack_Obama", "Thomas_Jefferson",
        "John_F._Kennedy","Lyndon_B._Johnson","Richard_Nixon","Alexander_Hamilton","Benjamin_Franklin","James_Madison",]
        break;
      case `category3`:
        titleArray = ["C._S._Lewis", "J._K._Rowling", "J._R._R._Tolkien", "Lewis_Carroll"]
        break;
      case `category4`:
        titleArray = ["Special_relativity", "Electromagnetic_spectrum", "Photosynthesis",
        "Gravity", "Chemical_bond", "Molecule", "Chemical_element", "Periodic_table"]
        break;
      case `category5`:
        titleArray = ["Macbeth", "Romeo_and_Juliet", "William_Shakespeare", "Hamlet", "The_Comedy_of_Errors", "Antony_and_Cleopatra"]
        break;
      case `category6`:
        titleArray = ["Moon", "Jupiter", "Mercury_(planet)", "Venus", "Mars", "Saturn", "Sun","Uranus","Neptune", "Pluto"]
        break;
      case `category7`:
        titleArray = ["Batman", "Superman","Wonder_Woman","Flash_(comics)","Green_Lantern", "Aquaman",
        "Dick_Grayson", "Catwoman","Barbara_Gordon","Green_Arrow","Roy_Harper_(character)","Justice_League",
      "Captain_Marvel_(DC_Comics)", "Black_Lightning","Joker_(character)","Deathstroke","Lex_Luthor","Suicide_Squad","Riddler"]
        break;
      default:
        setArticleString(``)
        break;
    }
    getArticle(titleArray)
  }


  return(
    <>
      <select
        className="browser-default"  id="categorySelect"
        options={{
          classes: '', dropdownOptions: {
            alignment: 'left',
            autoTrigger: true, closeOnClick: true, constrainWidth: true,
            container: null, coverTrigger: true, hover: false,
            inDuration: 150, onCloseEnd: null, onCloseStart: null,
            onOpenEnd: null, onOpenStart: null, outDuration: 250,
          }
        }}
        onChange={selectArticle}
      >
        <option value="0" disabled selected>About David's Typing Test (not a test)</option>
        <option value="category1">On US Historic Documents</option>
        <option value="category2">On US Presidents and Founding Fathers</option>
        <option value="category3">On Famous American and English Authors</option>
        <option value="category4">On Physics, Chemistry, and Biology</option>
        <option value="category5">On William Shakespeare</option>
        <option value="category6">On Celestial Bodies in our Solar System</option>
        <option value="category7">On DC Comics Characters</option>
      </select>
    </>
  )
}
export default ArticleSelect