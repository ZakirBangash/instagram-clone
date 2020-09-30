import React, { useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db, auth } from "./firebase";

const Posts = ({ imageUrl, caption, UserName, postId }) => {
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setcomments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      //  cleanup
      unsubscribe();
    };
  }, [postId]);

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="avatar__image"
          alt={UserName}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{UserName}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="Instagram Image" />
      <h4 className="post__text">
        <strong>{UserName}:</strong> {caption}
      </h4>
{/* 
        <form className='form'>
            <input type="text"/>

        </form> */}

    </div>
  );
};

export default Posts;
