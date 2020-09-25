import React, { useState,useEffect } from "react";
import "./App.css";
import Posts from "./Posts";
import { db } from './firebase'


function App() {
  const [post, setPost] = useState([
    // {
    //   imageUrl:
    //     "https://images.unsplash.com/photo-1600194991617-317f25e77508?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
    //   UserName: "Zakir Bangash",
    //   Caption: "My first Post on instagram clone",
    // },
    // {
    //   imageUrl:
    //     "https://images.unsplash.com/photo-1599722758280-6a90187b521c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjczMTc0fQ&auto=format&fit=crop",
    //   UserName: "Malik ShahZain",
    //   Caption: "I just joined Instagram really fun",
    // },
    // {
    //   imageUrl:
    //     "https://images.unsplash.com/photo-1599751449029-e4ea8f21d966?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjczMTc0fQ&auto=format&fit=crop",
    //   UserName: "Ayesha",
    //   Caption: "I love the Developer of this clone",
    // },
  ]);


useEffect(() => {
 
  
  db.collection('posts').onSnapshot(snapshot=>{
   setPost(snapshot.docs.map(doc => doc.data()))
    
  })

}, [])

  return (
    <div className="App">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      <h1>
        Hello Clever Programmers , i React developer doing instagram clone
      </h1>
      {post.map(({username,imageUrl,caption}) => {
        
        return(
        <Posts imageUrl={imageUrl} UserName={username} Caption={caption} />
      )})}
    </div>
  );
}

export default App;
